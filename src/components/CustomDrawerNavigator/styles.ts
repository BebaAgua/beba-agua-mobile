import styled from "styled-components/native";
import theme from "../../global/styles/theme";

interface MenuItemProps {
  isFocused: boolean;
}

export const Container = styled.View`
  background-color: ${(props) => props.theme.colors.drawerBackground};
  justify-content: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
`;

export const LogoImage = styled.Image`
  width: 120px;
  height: 120px;
`;

export const Divider = styled.View`
  height: 0.5px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.drawerText};
`;

export const MenuContainer = styled.View`
  margin-left: 10px;
`;

export const MenuButton = styled.TouchableOpacity``;

export const MenuItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  padding: 10px;
`;

export const MenuItemIcon = styled.View`
  margin-right: 10px;
`;

export const MenuItemText = styled.Text<MenuItemProps>`
  color: ${({ isFocused }) =>
    isFocused ? theme.colors.focus : theme.colors.drawerText};
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 13px;
`;

export const DividerContainer = styled.View`
  margin-top: 15px;
`;

export const LogoutButtonContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  margin-bottom: 5%;
`;

export const LogoutButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.attention};
  padding: 10px;
  margin: 10px;
  align-items: center;
  position: absolute;
  border-radius: 10px;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const LogoutButtonText = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 15px;
`;
