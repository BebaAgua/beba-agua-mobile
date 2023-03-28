import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import MyDatePicker from "../../components/DatePicker";
import { Form } from "../../components/Form";
import { Header } from "../../components/Header";
import { Container } from "./styles";

export function SignUp() {
  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f8ff" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="position" enabled>
          <>
            <Header />
            <Form />
          </>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
}
