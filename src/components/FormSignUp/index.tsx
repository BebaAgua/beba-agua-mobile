import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Keyboard } from "react-native";

import Button from "../Button";
import { ControlledInput } from "../ControlledInput";
import { Container, ContainerButton, Scroll } from "./styles";
import { ModalError } from "../ModalError";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  weight: string;
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
  weight: yup.string().required("Informe seu peso").min(0),
  age: yup.number().required("Informe sua idade").min(0),
});

export function FormSignUp() {
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
        "http://192.168.1.101:3000/register",
        data
      );
      const token = response.data.token;
      if (token) {
        await AsyncStorage.setItem("token", token);
        navigation.reset({ routes: [{ name: "Main" as never }] });
      } else {
        showError("Não foi possível obter o token de acesso.");
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        showError(
          "Este email já foi cadatrado anteriormente no app, faça seu login!"
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
      <ContainerButton>
        <Button
          title="Cadastrar"
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
