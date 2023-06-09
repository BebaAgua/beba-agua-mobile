import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Keyboard } from "react-native";

import UserContext from "../../contexts/UserContext";
import api from "../../services/api";
import Button from "../Button";
import { ControlledInput } from "../ControlledInput";
import { ErrorModal } from "../ErrorModal";
import { Container, Scroll, ButtonContainer } from "./styles";
import theme from "../../global/styles/theme";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  weight: number;
  age: number;
};

interface ErrorProps {
  message: string;
}
const schema = yup.object({
  name: yup.string().required("Informe seu nome."),
  email: yup.string().email("E-mail inválido!").required("Informe o E-mail."),
  password: yup
    .string()
    .min(6, "A senha precisa ter no mínimo 6 dígitos")
    .required("Informe sua senha."),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "A senha de confirmação não confere!")
    .required("Informe sua confirmação de senha"),
  weight: yup.number().required("Informe seu peso").min(0),
  age: yup.number().required("Informe sua idade").min(0),
});

export function FormSignUp() {
  const { setUser, setGoal } = useContext(UserContext);
  const [error, setError] = useState<ErrorProps>({ message: "" });
  const navigation = useNavigation();

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

  async function handleUserRegister(data: FormData) {
    try {
      const response = await api.post("/register", data);
      const token = response.data.token;
      const user = response.data.user;

      if (token && user) {
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("user", JSON.stringify(user));
        user.token = token;
        setUser(user);

        try {
          const { data } = await api.post(
            "/water-intake-goals",
            {
              userId: user.id,
              age: user.age,
              weight: user.weight,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const goalAmount = data.goalAmount;

          setGoal(goalAmount);
          await AsyncStorage.setItem("goal", JSON.stringify(goalAmount));
          console.log(goalAmount, "Sign Up");
        } catch (error) {
          showError(
            "Ocorreu um erro ao obter a meta de ingestão de água. Verifique sua conexão e tente novamente."
          );
        }

        navigation.reset({ routes: [{ name: "DrawerRoutes" as never }] });
      } else {
        showError("Não foi possível obter o token de acesso.");
      }
    } catch (error: any) {
      if (error.response) {
        showError(
          "Este email já foi cadatrado anteriormente no app, faça seu login!"
        );
      } else if (error.request) {
        showError(
          "Não foi possível conectar ao servidor. Tente novamente mais tarde."
        );
      } else {
        showError(
          "Ocorreu um erro inesperado. Verifique sua conexão e tente novamente."
        );
      }
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
      <Scroll showsVerticalScrollIndicator={false}>
        <Container>
          <ControlledInput
            name="name"
            control={control}
            icon="user"
            placeholder="Nome"
            error={errors.name}
          />
          <ControlledInput
            name="email"
            control={control}
            icon="envelope"
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />
          <ControlledInput
            name="password"
            control={control}
            icon="lock"
            placeholder="Senha"
            secureTextEntry
            error={errors.password}
          />
          <ControlledInput
            name="confirm_password"
            control={control}
            icon="lock"
            placeholder="Confirme a senha"
            secureTextEntry
            error={errors.confirm_password}
          />
          <ControlledInput
            name="weight"
            control={control}
            maxLength={6}
            icon="balance-scale"
            placeholder="Informe seu peso"
            keyboardType="numeric"
            error={errors.weight}
          />
          <ControlledInput
            name="age"
            control={control}
            maxLength={3}
            keyboardType="numeric"
            icon="birthday-cake"
            placeholder="Informe sua idade"
            error={errors.age}
          />
        </Container>
      </Scroll>
      <ButtonContainer>
        <Button
          title="Cadastrar"
          onPress={() => {
            handleSubmit(handleUserRegister)();
            Keyboard.dismiss();
          }}
          size={300}
          color={theme.colors.blue800}
        />
      </ButtonContainer>
    </>
  );
}
