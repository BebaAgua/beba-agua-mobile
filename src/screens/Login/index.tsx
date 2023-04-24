import {
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import { Header } from "../../components/Header";
import {
  Container,
  ForgotPasswordButton,
  ForgotPasswordButtonText,
} from "./styles";
import { FormLogin } from "../../components/FormLogin";
import theme from "../../global/styles/theme";

interface ForgotPasswordProps {
  navigation: any;
}

export function Login(props: ForgotPasswordProps) {
  const { navigation } = props;
  const handleForgotYourPassword = () => {
    navigation.navigate("ForgotPassword");
  };

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
              title="Faça seu login!"
              subtitle={`Aproveite e volte a se \nhidratar com ajuda \ndo nosso app.`}
            />
            <FormLogin />
          </>
          <ForgotPasswordButton onPress={handleForgotYourPassword}>
            <ForgotPasswordButtonText>
              Esqueceu sua senha?
            </ForgotPasswordButtonText>
          </ForgotPasswordButton>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
}
