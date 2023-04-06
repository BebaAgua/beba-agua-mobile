import {
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import { Header } from "../../components/Header";
import { Container } from "./styles";
import { FormForgotPassword } from "../../components/FormForgotPassword";

export function ForgotPassword() {
  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f8ff" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="position" enabled>
          <>
            <Header
              title={`Esqueceu sua \nsenha?`}
              subtitle={`Não tem problema,\né só cadastrar uma nova. \nSó pedimos um email válido.`}
            />
            <FormForgotPassword />
          </>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
}
