import { Keyboard } from "react-native";
import Button from "../Button";
import { ControlledInput } from "../ControlledInput";
import { Container, ContainerButton } from "./styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import theme from "../../global/styles/theme";

type FormData = {
  email: string;
  password: string;
  confirm_password: string;
};

const schema = yup.object({
  email: yup
    .string()
    .email("E-mail inválido!")
    .required("Informe um E-mail válido."),
  password: yup
    .string()
    .min(6, "A senha precisa ter no mínimo 6 dígitos")
    .required("Informe sua senha."),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "A senha de confirmação não confere!")
    .required("Informe sua confirmação de senha"),
});

export function FormForgotPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  function handleUserRegister(data: FormData) {
    console.log(data);
  }

  return (
    <>
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
        <ControlledInput
          name="confirm_password"
          control={control}
          icon="lock"
          placeholder="Confirme a senha"
          secureTextEntry
          error={errors.confirm_password}
        />
      </Container>
      <ContainerButton>
        <Button
          title="Cadastrar nova senha"
          onPress={() => {
            handleSubmit(handleUserRegister)();
            Keyboard.dismiss();
          }}
          size={300}
          color={theme.colors.blue800}
        />
      </ContainerButton>
    </>
  );
}
