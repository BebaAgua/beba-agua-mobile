import { TextInput } from "react-native";
import styled, { css } from "styled-components/native";

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
`;

export const IconContainer = styled.View<Props>`
  height: 46px;
  width: 46px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  margin-right: 2px;
  background-color: ${(props) => props.theme.colors.background};
  border: ${(props) => props.theme.colors.secondary};
  ${({ isFocused }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border: ${(props) => props.theme.colors.focus};
    `};
`;

export const InputText = styled(TextInput)<Props>`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 12px;
  border: ${(props) => props.theme.colors.secondary};
  border-radius: 5px;
  color: ${(props) => props.theme.colors.textInput};
  padding: 0 23px;
  ${({ isFocused }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border: ${(props) => props.theme.colors.focus};
    `};
`;
