import styled from "styled-components/native";

export const Container = styled.View`
  margin-top: 40px;
  margin-bottom: 40px;
`;

export const TitleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const WelcomeTitle = styled.Text`
  font-size: 20px;
  font-family: ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.secondary};
`;

export const MenuButton = styled.TouchableOpacity`
  align-self: flex-start;
  padding: 5px;
`;

export const ContainerGoal = styled.View`
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 10px;
  justify-content: space-between;
  flex-direction: row;
`;
export const TextGoal = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 20px;
`;

export const TextMl = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 20px;
`;
