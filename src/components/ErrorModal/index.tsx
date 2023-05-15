import React, { useState } from "react";
import { StatusBar } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import Button from "../Button";

import {
  ModalError,
  Container,
  ViewContainerIcon,
  ViewContainer,
  TextError,
  TextIcon,
} from "./styles";
import theme from "../../global/styles/theme";

interface ErrorModalProps {
  errorMessage: string;
  onClose?: () => void;
}

export function ErrorModal({ onClose, errorMessage }: ErrorModalProps) {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    onClose && onClose();
  };

  return (
    <ModalError visible={visible} animationType="fade" transparent={true}>
      <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" barStyle="dark-content" />

      <Container>
        <ViewContainer>
          <ViewContainerIcon>
            <FontAwesome
              name="exclamation-triangle"
              size={24}
              color={theme.colors.attention}
            />
            <TextIcon>Atenção!</TextIcon>
          </ViewContainerIcon>
          <TextError>{errorMessage}</TextError>
          <Button
            title="Fechar"
            onPress={handleClose}
            size={250}
            color={theme.colors.formButton}
          />
        </ViewContainer>
      </Container>
    </ModalError>
  );
}
