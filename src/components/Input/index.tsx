import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { Container, IconContainer, InputText } from "./styles";
import theme from "../../global/styles/theme";

export type InputProps = TextInputProps & {
  icon: React.ComponentProps<typeof FontAwesome>["name"];
  value?: string;
};

export function Input({ icon, value, ...rest }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused} isFilled={isFilled}>
        <FontAwesome
          name={icon}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.focus : theme.colors.secondary
          }
        />
      </IconContainer>

      <InputText
        isFilled={isFilled}
        placeholderTextColor={
          isFocused || isFilled ? theme.colors.focus : theme.colors.secondary
        }
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        value={value}
        {...rest}
      />
    </Container>
  );
}
