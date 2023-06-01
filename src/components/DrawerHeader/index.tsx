import { useNavigation, DrawerActions } from "@react-navigation/native";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import theme from "../../global/styles/theme";

import {
  Container,
  HeaderWrapper,
  BackButton,
  ProfileText,
  MenuButton,
} from "./styles";

interface HeaderProps {
  title: string;
  showMenuButton: boolean;
  onPressBack?: () => void;
}

export function DrawerHeader({
  title,
  showMenuButton = true,
  onPressBack,
}: HeaderProps) {
  const navigation = useNavigation();
  function handleOpenMenu() {
    navigation.dispatch(DrawerActions.openDrawer());
  }

  function handleBackButton() {
    if (onPressBack) {
      onPressBack();
    } else {
      navigation.goBack();
    }
  }

  return (
    <Container>
      <HeaderWrapper>
        <BackButton onPress={handleBackButton}>
          <Icon name="arrow-left" size={26} color={theme.colors.focus} />
        </BackButton>
        <ProfileText>{title}</ProfileText>
      </HeaderWrapper>
      {showMenuButton && (
        <MenuButton onPress={handleOpenMenu}>
          <Icon name="menu" size={26} color={theme.colors.focus} />
        </MenuButton>
      )}
    </Container>
  );
}
