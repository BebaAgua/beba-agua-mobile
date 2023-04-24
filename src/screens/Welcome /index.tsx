import { StatusBar } from "react-native";

import Button from "../../components/Button";
import {
  Container,
  ContainerColor1,
  ContainerColor2,
  Title,
  Subtitle,
  LoginButton,
  LoginButtonText,
} from "./styles";
import theme from "../../global/styles/theme";

interface WelcomeProps {
  navigation: any;
}

export function Welcome(props: WelcomeProps) {
  const { navigation } = props;
  const handleScreenLogin = () => {
    navigation.navigate("Login");
  };
  const handleScreenRegister = () => {
    navigation.navigate("SignUp");
  };

  return (
    <Container>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle="light-content"
      />
      <ContainerColor1>
        <Title>Bem vindo ao Beba Água!</Title>
        <Subtitle>
          Vamos juntos manter o hábito de ingerir a quantidade correta de água
          diariamente.
        </Subtitle>
      </ContainerColor1>
      <ContainerColor2>
        <Button
          title="Criar uma conta"
          onPress={handleScreenRegister}
          size={280}
        ></Button>
        <LoginButton onPress={handleScreenLogin}>
          <LoginButtonText>Entrar com minha conta</LoginButtonText>
        </LoginButton>
      </ContainerColor2>
    </Container>
  );
}
