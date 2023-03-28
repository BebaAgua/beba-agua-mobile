import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #00bfff;
`;

export const ContainerColor1 = styled.View`
  flex: 3;
  background-color: #00bfff;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const ContainerColor2 = styled.View`
  flex: 1;
  background-color: #f8f8ff;
  margin-top: -25px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const WelcomeText = styled.Text`
  color: #f8f8ff;
  font-size: 30px;
  font-weight: bold;
  margin-left: 20px;
  margin-right: 45%;
`;

export const WelcomeText2 = styled.Text`
  color: #f8f8ff;
  margin-top: 20px;
  font-size: 20px;
  margin-left: 20px;
  margin-right: 45%;
`;

export const LoginButton = styled.TouchableOpacity`
  background: #f8f8ff;
  border-color: #f8f8ff;
  padding: 30px;
`;

export const LoginButtonText = styled.Text`
  color: #2196f3;
  font-size: 18px;
  margin-left: 16px;
  font-weight: bold;
`;
