import { TextInput, TouchableOpacity } from "react-native";
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
  background-color: #f8f8ff;
  border: #2196f3
    ${({ isFocused }) =>
      isFocused &&
      css`
        border-bottom-width: 2px;
        border: #333766;
      `};
`;

export const InputText = styled(TextInput)<Props>`
  flex: 1;
  background-color: #f8f8ff;
  border: #2196f3;
  border-radius: 5px;
  color: #404040;
  padding: 0 23px;
  ${({ isFocused }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border: #333766;
    `};
`;
