import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState } from "react";

import { Keyboard } from "react-native";
import Button from "../Button";
import { ControlledInput } from "../ControlledInput";
import { Container, ContainerButton } from "./styles";
import { ModalError } from "../ModalError";

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
      const response = await axios.post(
        "http://192.168.1.101:3000/login",
        data
      );
      const token = response.data.token;
      if (token) {
        await AsyncStorage.setItem("token", token);
        console.log(token);
        navigation.reset({ routes: [{ name: "Main" as never }] });
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
        <ModalError
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
            handleSubmit(handleUserRegister)();
            Keyboard.dismiss();
          }}
          size={300}
          color="#333766"
        />
      </ContainerButton>
    </>
  );
}
