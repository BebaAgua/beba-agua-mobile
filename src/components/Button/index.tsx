import React, { useState } from "react";
import { TouchableOpacityProps } from "react-native";
import { StyledText, StyledTouchableOpacity } from "./styles";
import theme from "../../global/styles/theme";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  color?: string;
  size?: number;
}

function Button(props: ButtonProps): JSX.Element {
  const { title, onPress, color = theme.colors.button, size = 230 } = props;
  const handlePress = () => {
    onPress();
  };

  return (
    <StyledTouchableOpacity onPress={handlePress} size={size} color={color}>
      <StyledText>{title}</StyledText>
    </StyledTouchableOpacity>
  );
}

export default Button;
