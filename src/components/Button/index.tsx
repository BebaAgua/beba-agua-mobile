import React from "react";
import { StyledText, StyledTouchableOpacity } from "./styles";

interface ButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
}

const Button = (props: ButtonProps): JSX.Element => {
  const { title, onPress, color = "#2196f3" } = props;

  const handlePress = () => {
    onPress();
  };

  return (
    <StyledTouchableOpacity onPress={handlePress}>
      <StyledText>{title}</StyledText>
    </StyledTouchableOpacity>
  );
};

export default Button;
