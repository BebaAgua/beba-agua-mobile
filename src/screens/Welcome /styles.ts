import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const ContainerColor1 = styled.View`
  flex: 2;
  background-color: ${(props) => props.theme.colors.blue500};
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const ContainerColor2 = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.white200};
  margin-top: -25px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.white200};
  font-family: ${(props) => props.theme.fonts.medium};
  font-size: 30px;
  margin-left: 5%;
  margin-right: 45%;
`;

export const Subtitle = styled.Text`
  color: ${(props) => props.theme.colors.white200};
  font-family: ${(props) => props.theme.fonts.regular};
  margin-top: 20px;
  font-size: 18px;
  margin-left: 5%;
  margin-right: 45%;
`;

export const LoginButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.white200};
  border-color: ${(props) => props.theme.colors.white200};
  padding: 30px;
`;

export const LoginButtonText = styled.Text`
  margin-left: 16px;
  color: ${(props) => props.theme.colors.blue600};
  font-family: ${(props) => props.theme.fonts.medium};
  font-size: 16px;
`;
