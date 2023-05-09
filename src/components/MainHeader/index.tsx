import React, { useContext } from "react";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import UserContext from "../../contexts/UserContext";
import theme from "../../global/styles/theme";

import {
  Container,
  WelcomeTitle,
  TextMl,
  ContainerGoal,
  TextGoal,
  TextPercentage,
  ContainerPercentage,
  TitleWrapper,
  MenuButton,
} from "./styles";

type Props = {
  ml: number;
  percents: number;
};

export function MainHeader({ ml, percents }: Props) {
  const { goal, user } = useContext(UserContext);
  const navigation = useNavigation();

  function handleOpenMenu() {
    navigation.dispatch(DrawerActions.openDrawer());
  }

  return (
    <Container>
      <TitleWrapper>
        <WelcomeTitle>Olá {user?.name.trim()}!</WelcomeTitle>
        <MenuButton onPress={handleOpenMenu}>
          <Icon name="menu" size={26} color={theme.colors.secondary} />
        </MenuButton>
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
