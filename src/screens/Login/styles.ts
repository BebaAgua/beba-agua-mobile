import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f8f8ff;
  padding: 24px;
`;

export const ForgotPasswordButton = styled.TouchableOpacity`
  background: ${(props) => props.theme.colors.background};
  border-color: ${(props) => props.theme.colors.background};
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

export const ForgotPasswordButtonText = styled.Text`
  font-family: ${(props) => props.theme.fonts.medium};
  font-size: 16px;
  color: ${(props) => props.theme.colors.secondary};
`;
