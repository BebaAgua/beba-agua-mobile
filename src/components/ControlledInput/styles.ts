import styled from "styled-components/native";

export const Error = styled.Text`
  color: ${(props) => props.theme.colors.red700};
  margin: 3px 0 16px;
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 12px;
`;
