import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

import theme from "../../global/styles/theme";
import UserContext from "../../contexts/UserContext";

import {
  Container,
  Divider,
  DividerContainer,
  LogoImage,
  LogoutButton,
  LogoutButtonContainer,
  LogoutButtonText,
  MenuButton,
  MenuContainer,
  MenuItemContainer,
  MenuItemIcon,
  MenuItemText,
} from "./styles";

const menuItems = [
  {
    icon: <FontAwesome5 name="home" size={24} color={theme.colors.primary} />,
    activeIcon: (
      <FontAwesome5 name="home" size={24} color={theme.colors.focus} />
    ),
    text: "Home",
    screen: "Main",
  },
  {
    icon: (
      <MaterialCommunityIcons
        name="cup"
        size={24}
        color={theme.colors.primary}
      />
    ),
    activeIcon: (
      <MaterialCommunityIcons name="cup" size={24} color={theme.colors.focus} />
    ),
    text: "Ingestão de água do dia",
    screen: "DailyWaterIntake",
  },
  {
    icon: (
      <FontAwesome5 name="history" size={24} color={theme.colors.primary} />
    ),
    activeIcon: (
      <FontAwesome5 name="history" size={24} color={theme.colors.focus} />
    ),
    text: "Histórico de ingestão de água",
    screen: "WaterIntakeReport",
  },
  {
    icon: (
      <FontAwesome5 name="user-alt" size={24} color={theme.colors.primary} />
    ),
    activeIcon: (
      <FontAwesome5 name="user-alt" size={24} color={theme.colors.focus} />
    ),
    text: "Perfil",
    screen: "Profile",
  },
];

interface CustomDrawerContentProps {
  state: any;
  navigation: any;
}

export function CustomDrawerNavigator({
  state,
  navigation,
}: CustomDrawerContentProps) {
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

  const navigationScreen = useNavigation();

  const handleLogout = () => {
    removeTokeAndUser();
    console.log("User logged out");
    navigationScreen.reset({ routes: [{ name: "Welcome" as never }] });
  };

  return (
    <>
      <Container>
        <LogoImage source={require("../../assets/icons/icon.png")} />
      </Container>
      <Divider />
      <MenuContainer>
        {menuItems.map((item, index) => {
          const isFocused = state.index === index;
          const icon = isFocused ? item.activeIcon : item.icon;
          return (
            <MenuButton
              key={item.screen}
              onPress={() => navigation.navigate(item.screen)}
            >
              <MenuItemContainer>
                <MenuItemIcon>{icon}</MenuItemIcon>
                <MenuItemText isFocused={isFocused}>{item.text}</MenuItemText>
              </MenuItemContainer>
            </MenuButton>
          );
        })}
      </MenuContainer>
      <DividerContainer>
        <Divider />
      </DividerContainer>
      <LogoutButtonContainer>
        <LogoutButton onPress={handleLogout}>
          <LogoutButtonText>Sair</LogoutButtonText>
        </LogoutButton>
      </LogoutButtonContainer>
    </>
  );
}
