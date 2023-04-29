import { StatusBar, Text, TouchableOpacity, View } from "react-native";

import {
  CongratulationImage,
  CongratulationText,
  Container,
  Content,
  ModalCongratulation,
} from "./styles";

import Button from "../Button";
import theme from "../../global/styles/theme";

interface CongratulationModalProps {
  visible: boolean;
  onClose: () => void;
}

export function CongratulationModal({
  visible,
  onClose,
}: CongratulationModalProps) {
  return (
    <ModalCongratulation
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" barStyle="dark-content" />
      <Container>
        <Content>
          <CongratulationImage
            source={require("../../assets/icons/congratulation.png")}
          />

          <CongratulationText>
            Você alcançou sua meta {"\n"}diária de água!
          </CongratulationText>
          <Button
            title="Fechar"
            onPress={onClose}
            size={250}
            color={theme.colors.formButton}
          />
        </Content>
      </Container>
    </ModalCongratulation>
  );
}
