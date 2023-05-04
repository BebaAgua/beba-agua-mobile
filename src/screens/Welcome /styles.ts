import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const ContainerColor1 = styled.View`
  flex: 2;
  background-color: ${(props) => props.theme.colors.waves};
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const ContainerColor2 = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  margin-top: -25px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.medium};
  font-size: 30px;
  margin-left: 5%;
  margin-right: 45%;
`;

export const Subtitle = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fonts.regular};
  margin-top: 20px;
  font-size: 18px;
  margin-left: 5%;
  margin-right: 45%;
`;

export const LoginButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.background};
  border-color: ${(props) => props.theme.colors.shape};
  padding: 30px;
`;

export const LoginButtonText = styled.Text`
  margin-left: 16px;
  color: ${(props) => props.theme.colors.secondary};
  font-family: ${(props) => props.theme.fonts.medium};
  font-size: 16px;
`;
