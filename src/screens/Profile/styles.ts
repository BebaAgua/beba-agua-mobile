import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.background};
`;

export const PerfilText = styled.Text`
  font-size: 30px;
  font-family: ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.secondary};
`;
