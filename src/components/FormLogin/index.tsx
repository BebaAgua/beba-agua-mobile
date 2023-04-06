import { Keyboard } from "react-native";
import Button from "../Button";
import { ControlledInput } from "../ControlledInput";
import { Container, ContainerButton } from "./styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormData = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email("E-mail inválido!").required("Informe o E-mail."),
  password: yup
    .string()
    .min(6, "A senha precisa ter no mínimo 6 dígitos")
    .required("Informe sua senha."),
});

export function FormLogin() {
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
