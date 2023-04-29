import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

import { StatusBar } from "react-native";

import {
  Container,
  Content,
  ModalWater,
  OptionButton,
  OptionText,
  Title,
  WaterImage,
} from "./styles";
import theme from "../../global/styles/theme";

type WaterModalProps = {
  visible: boolean;
  onDrink: (mlToAdd: number) => void;
};

const WaterModal = ({ visible, onDrink }: WaterModalProps) => {
  function handleOptionSelect(option: string) {
    let mlToAdd = 0;
    if (option === "glass") {
      mlToAdd = 300;
    } else if (option === "bottle") {
      mlToAdd = 500;
    }

    onDrink(mlToAdd);
  }

  return (
    <ModalWater transparent={true} visible={visible}>
      <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" barStyle="dark-content" />
      <Container>
        <Content>
          <WaterImage source={require("../../assets/icons/water-bottle.png")} />
          <Title>Escolha a quantidade de água</Title>
          <OptionButton onPress={() => handleOptionSelect("glass")}>
            <MaterialCommunityIcons
              name="cup-water"
              size={32}
              color={theme.colors.background}
            />
            <OptionText>Copo (300ml)</OptionText>
          </OptionButton>
          <OptionButton onPress={() => handleOptionSelect("bottle")}>
            <FontAwesome5
              name="wine-bottle"
              size={32}
              color={theme.colors.background}
            />
            <OptionText>Garrafa (500ml)</OptionText>
          </OptionButton>
        </Content>
      </Container>
    </ModalWater>
  );
};

export default WaterModal;
