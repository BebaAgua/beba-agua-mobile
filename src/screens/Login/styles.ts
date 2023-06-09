import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.white200};
  padding: 24px;
`;

export const ForgotPasswordButton = styled.TouchableOpacity`
  background: ${(props) => props.theme.colors.white200};
  border-color: ${(props) => props.theme.colors.white200};
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

export const ForgotPasswordButtonText = styled.Text`
  font-family: ${(props) => props.theme.fonts.medium};
  font-size: 16px;
  color: ${(props) => props.theme.colors.blue600};
`;
