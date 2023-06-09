import { TextInput } from "react-native";
import styled, { css } from "styled-components/native";

interface Props {
  isFocused: boolean;
  isFilled: boolean;
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
  background-color: ${(props) => props.theme.colors.white200};
  border: ${(props) => props.theme.colors.blue600};

  ${(props) =>
    (props.isFocused || props.isFilled) &&
    css`
      border-color: ${props.theme.colors.blue800};
    `}
`;

export const InputText = styled(TextInput)<Props>`
  flex: 1;
  background-color: ${(props) => props.theme.colors.white200};
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 12px;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.gray600};
  padding: 0 23px;
  border: ${(props) => props.theme.colors.blue600};

  ${(props) =>
    (props.isFocused || props.isFilled) &&
    css`
      border-color: ${props.theme.colors.blue800};
    `}
`;
