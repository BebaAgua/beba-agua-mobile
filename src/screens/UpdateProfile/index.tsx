import { Keyboard, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";

import UserContext from "../../contexts/UserContext";
import { DrawerHeader } from "../../components/DrawerHeader";
import Button from "../../components/Button";
import { ControlledInput } from "../../components/ControlledInput";
import { ErrorModal } from "../../components/ErrorModal";
import theme from "../../global/styles/theme";
import { Container, UpdateProfileContainer, ButtonContainer } from "./styles";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UpdateModal } from "../../components/UpdateModal";

type FormData = {
  name?: string;
  weight?: number;
  age?: number;
};

interface ErrorProps {
  message: string;
}

const schema = yup.object({
  name: yup.string(),
  weight: yup.number().min(0),
  age: yup.number().min(0),
});

export function UpdateProfile() {
  const [error, setError] = useState<ErrorProps>({ message: "" });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { user, setGoal } = useContext(UserContext);

  const navigation = useNavigation();

  function handleCustomBackButton() {
    navigation.reset({ routes: [{ name: "Profile" as never }] });
  }

  const showError = (message: string) => {
    setError({ message });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  async function handleUserUpdate(data: FormData) {
    try {
      if (!data.name && !data.weight && !data.age) {
        showError(`É necessário atualizar ao menos\n um dos dados`);
        return;
      }

      const response = await api.put(`/user/${user?.id}`, data, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      if (user) {
        user.name = data.name ?? user.name;
        user.weight = data.weight ?? user.weight;
        user.age = data.age ?? user.age;

        await AsyncStorage.setItem("user", JSON.stringify(user));
      }
      console.log("Dados do usuário atualizados com sucesso:", response.data);

      try {
        const { data } = await api.post(
          "/water-intake-goals",
          {
            userId: user?.id,
            age: user?.age,
            weight: user?.weight,
          },
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        );

        const goalAmount = data.goalAmount;

        setGoal(goalAmount);
        await AsyncStorage.setItem("goal", JSON.stringify(goalAmount));
        console.log(goalAmount, "Update User");
        setIsModalVisible(true);
      } catch (error) {
        showError(
          "Ocorreu um erro ao obter a meta de ingestão de água. Verifique sua conexão e tente novamente."
        );
      }
    } catch (error) {
      showError(
        "Ocorreu um erro inesperado. Verifique sua conexão e tente novamente."
      );
    }
  }

  return (
    <>
      {error.message && (
        <ErrorModal
          errorMessage={error.message}
          onClose={() => setError({ message: "" })}
        />
      )}
      <UpdateModal visible={isModalVisible} />
      <Container>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={theme.colors.background}
        />

        <DrawerHeader
          title="Alterar Perfil"
          showMenuButton={false}
          onPressBack={handleCustomBackButton}
        />
        <UpdateProfileContainer>
          <ControlledInput
            name="name"
            control={control}
            icon="user"
            placeholder="Nome"
            defaultValue={user?.name}
            error={errors.name}
          />
          <ControlledInput
            name="email"
            control={control}
            icon="envelope"
            placeholder="E-mail"
            style={{ color: theme.colors.drawerText }}
            editable={false}
            value={user?.email}
          />

          <ControlledInput
            name="weight"
            control={control}
            maxLength={6}
            icon="balance-scale"
            placeholder="Informe seu peso"
            keyboardType="numeric"
            defaultValue={user?.weight.toString()}
            error={errors.weight}
          />
          <ControlledInput
            name="age"
            control={control}
            maxLength={3}
            keyboardType="numeric"
            icon="birthday-cake"
            placeholder="Informe sua idade"
            defaultValue={user?.age.toString()}
            error={errors.age}
          />
        </UpdateProfileContainer>
        <ButtonContainer>
          <Button
            title="Salvar"
            onPress={() => {
              handleSubmit(handleUserUpdate)();
              Keyboard.dismiss();
            }}
            size={310}
            color={theme.colors.formButton}
          />
        </ButtonContainer>
      </Container>
    </>
  );
}
