import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import { FormSignUp } from "../../components/FormSignUp";
import { Header } from "../../components/Header";
import { Container } from "./styles";
import theme from "../../global/styles/theme";

export function SignUp() {
  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="position" enabled>
          <>
            <Header
              title="Crie sua conta!"
              subtitle={`Faça seu cadastro e \ncomece a hidratar-se \nagora mesmo.`}
            />
            <FormSignUp />
          </>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
}
