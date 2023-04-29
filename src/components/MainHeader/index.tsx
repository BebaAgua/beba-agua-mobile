import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import Icon from "@expo/vector-icons/FontAwesome";

import {
  Container,
  WelcomeTitle,
  TextMl,
  ContainerGoal,
  TextGoal,
  TextPercentage,
  ContainerPercentage,
  TitleWrapper,
  BackButton,
} from "./styles";
import theme from "../../global/styles/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

type Props = {
  ml: number;
  percents: number;
};

export function MainHeader({ ml, percents }: Props) {
  const { goal, user } = useContext(UserContext);

  const removeTokeAndUser = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("goal");
    } catch (error) {
      console.log("Error removing token, user or goal", error);
    }
  };

  const navigation = useNavigation();

  const handleLogout = () => {
    removeTokeAndUser();
    console.log("User logged out");
    navigation.reset({ routes: [{ name: "Welcome" as never }] });
  };

  return (
    <Container>
      <TitleWrapper>
        <WelcomeTitle>Olá {user?.name.trim()}!</WelcomeTitle>
        <BackButton onPress={handleLogout}>
          <Icon name="arrow-left" size={24} color={theme.colors.secondary} />
        </BackButton>
      </TitleWrapper>
      <ContainerGoal>
        <TextGoal>Meta</TextGoal>
        <TextMl>
          {ml}/{goal} ml
        </TextMl>
      </ContainerGoal>
      <ContainerPercentage>
        <TextPercentage>{percents}%</TextPercentage>
      </ContainerPercentage>
    </Container>
  );
}
