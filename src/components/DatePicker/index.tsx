import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Container, IconContainer, InputText } from "./styles";
import { TextInputProps } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export type InputProps = TextInputProps & {
  icon: React.ComponentProps<typeof FontAwesome>["name"];
  value?: Date | undefined;
  onDateChange?: (date: Date | undefined) => void;
};

export function DatePickerComponent({
  icon,
  value,
  onDateChange,
  ...rest
}: InputProps): JSX.Element {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  function handleConfirm(date: Date) {
    setSelectedDate(date);
    setIsDatePickerVisible(false);
    onDateChange && onDateChange(date);
  }

  function handleCancel() {
    setIsDatePickerVisible(false);
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <FontAwesome
          name={icon}
          size={24}
          color={isFocused || isFilled ? "#333766" : "#2196f3"}
        />
      </IconContainer>

      <InputText
        placeholderTextColor="#2196f3"
        onFocus={() => {
          setIsDatePickerVisible(true);
          handleInputFocus();
        }}
        onBlur={() => {
          setIsDatePickerVisible(false);
          handleInputBlur();
        }}
        isFocused={isFocused}
        value={selectedDate?.toLocaleDateString()}
        {...rest}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </Container>
  );
}
