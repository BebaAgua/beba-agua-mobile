import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const HeaderWrapper = styled.View`
  flex-direction: row;
`;
export const BackButton = styled.TouchableOpacity`
  padding: 5px;
  align-self: flex-start;
`;

export const ProfileText = styled.Text`
  font-size: 20px;
  margin-left: 5px;
  font-family: ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.blue800};
`;

export const MenuButton = styled.TouchableOpacity`
  align-self: flex-start;
  padding: 5px;
`;
