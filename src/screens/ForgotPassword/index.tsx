import {
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import { Header } from "../../components/Header";
import { Container } from "./styles";
import { FormForgotPassword } from "../../components/FormForgotPassword";
import theme from "../../global/styles/theme";

export function ForgotPassword() {
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
