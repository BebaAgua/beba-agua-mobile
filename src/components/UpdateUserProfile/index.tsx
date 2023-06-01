import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import UserContext from "../../contexts/UserContext";

import {
  Container,
  TitleWrapper,
  ProfileWrapper,
  ProfileAvatar,
  NameText,
  ButtonWrapper,
  UpdateButton,
  ButtonText,
  DescriptionText,
} from "./styles";

export function UpdateUserProfile() {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();

  function handleUpdate() {
    navigation.reset({ routes: [{ name: "UpdateProfile" as never }] });
  }

  return (
    <Container>
      <TitleWrapper>
        <ProfileWrapper>
          <ProfileAvatar source={require("../../assets/icons/user.png")} />
          <NameText>{user?.name.trim()}</NameText>
        </ProfileWrapper>
      </TitleWrapper>
      <ButtonWrapper>
        <UpdateButton onPress={handleUpdate}>
          <ButtonText>Alterar Perfil</ButtonText>
        </UpdateButton>
      </ButtonWrapper>
      <DescriptionText>
        {`Clicando no botão "Alterar Perfil" você poderá:\n- Mudar seu nome, caso tenha errado na hora do cadastro;\n- Mudar sua idade*;\n- Mudar o seu peso*.\n* Mudando seu peso ou idade, poderá ocorrer mudança na sua meta de ingestão diária.`}
      </DescriptionText>
    </Container>
  );
}
