import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useState } from "react";
import { Keyboard } from "react-native";

import UserContext from "../../contexts/UserContext";
import api from "../../services/api";
import Button from "../Button";
import { ControlledInput } from "../ControlledInput";
import { ErrorModal } from "../ErrorModal";
import { Container, ContainerButton } from "./styles";
import theme from "../../global/styles/theme";

type FormData = {
  email: string;
  password: string;
};

interface ErrorProps {
  message: string;
}

const schema = yup.object({
  email: yup.string().email("E-mail inválido!").required("Informe o E-mail."),
  password: yup
    .string()
    .min(6, "A senha precisa ter no mínimo 6 dígitos")
    .required("Informe sua senha."),
});

export function FormLogin() {
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

  async function handleUserLogin(data: FormData) {
    try {
      const response = await api.post("/login", data);
      const token = response.data.token;
      const user = response.data.user;

      if (token && user) {
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("user", JSON.stringify(user));
        user.token = token;
        setUser(user);

        try {
          const { data } = await api.get(`/water-intake-goal/${user?.id}`, {
            headers: { Authorization: `Bearer ${user?.token}` },
          });

          if (Array.isArray(data) && data.length > 0) {
            const latestGoal = data.reduce((latest, current) => {
              if (
                !latest ||
                new Date(current.createdAt) > new Date(latest.createdAt)
              ) {
                return current;
              }
              return latest;
            }, null);

            if (latestGoal) {
              setGoal(latestGoal.goalAmount);
              await AsyncStorage.setItem(
                "goal",
                JSON.stringify(latestGoal.goalAmount)
              );
              console.log(latestGoal.goalAmount, "login");
            } else {
              showError(
                "Não foi possível obter a meta diária de ingestão de água."
              );
            }
          } else {
            showError(
              "Não foi possível obter a meta diária de ingestão de água."
            );
          }
        } catch (error) {
          console.log(error);
          showError(
            "Não foi possível obter a meta diária de ingestão de água."
          );
        }

        navigation.reset({ routes: [{ name: "DrawerRoutes" as never }] });
      } else {
        showError("Não foi possível obter o token de acesso.");
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        showError(
          "Erro ao realizar login. Verifique suas credenciais e tente novamente."
        );
      } else if (error.request) {
        console.log(error.request);
        showError(
          "Não foi possível conectar ao servidor. Tente novamente mais tarde."
        );
      } else {
        console.log("Error", error.message);
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
      <Container>
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
      </Container>
      <ContainerButton>
        <Button
          title="Entrar"
          onPress={() => {
            handleSubmit(handleUserLogin)();
            Keyboard.dismiss();
          }}
          size={300}
          color={theme.colors.blue800}
        />
      </ContainerButton>
    </>
  );
}
