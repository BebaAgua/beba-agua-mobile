import { StatusBar } from "react-native";
import { DrawerHeader } from "../../components/DrawerHeader";
import { UpdateUserProfile } from "../../components/UpdateUserProfile";

import { Container } from "./styles";
import theme from "../../global/styles/theme";

export function Profile() {
  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />
      <DrawerHeader title="Perfil" showMenuButton={true} />
      <UpdateUserProfile />
    </Container>
  );
}
