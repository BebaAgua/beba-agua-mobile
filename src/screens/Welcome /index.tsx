import { StatusBar } from "react-native";

import Button from "../../components/Button";
import {
  Container,
  ContainerColor1,
  ContainerColor2,
  WelcomeText,
  WelcomeText2,
  LoginButton,
  LoginButtonText,
} from "./styles";

interface WelcomeProps {
  navigation: any;
}

export function Welcome(props: WelcomeProps) {
  const { navigation } = props;
  const handleScreenLogin = () => {
    navigation.navigate("Login");
  };
  const handleScreenRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <Container>
      <StatusBar backgroundColor="#00bfff" barStyle="light-content" />
      <ContainerColor1>
        <WelcomeText>Bem vindo ao Beba Água!</WelcomeText>
        <WelcomeText2>
          Vamos juntos manter o hábito de ingerir a quantidade correta de água
          diariamente.
        </WelcomeText2>
      </ContainerColor1>
      <ContainerColor2>
        <Button title="Criar uma conta" onPress={handleScreenRegister}></Button>
        <LoginButton onPress={handleScreenLogin}>
          <LoginButtonText>Entrar na minha conta</LoginButtonText>
        </LoginButton>
      </ContainerColor2>
    </Container>
  );
}
