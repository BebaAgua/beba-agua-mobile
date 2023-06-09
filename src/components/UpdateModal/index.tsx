import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Button from "../Button";
import theme from "../../global/styles/theme";
import {
  ModalUpdate,
  Container,
  Content,
  UpdateImage,
  UpdateText,
} from "./styles";

interface UpdateModalProps {
  visible: boolean;
}

export function UpdateModal({ visible }: UpdateModalProps) {
  const navigation = useNavigation();

  function handleUpdate() {
    navigation.reset({ routes: [{ name: "DrawerRoutes" as never }] });
  }
  return (
    <ModalUpdate animationType="fade" transparent={true} visible={visible}>
      <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" barStyle="dark-content" />
      <Container>
        <Content>
          <UpdateImage source={require("../../assets/icons/update.png")} />
          <UpdateText>{`Dados atualizados com\n sucesso!`}</UpdateText>
          <Button
            title="Fechar"
            onPress={handleUpdate}
            size={250}
            color={theme.colors.blue800}
          />
        </Content>
      </Container>
    </ModalUpdate>
  );
}
