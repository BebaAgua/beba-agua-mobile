import Icon from "@expo/vector-icons/FontAwesome";
import { BackButton, Container, Subtitle, Title, TitleWrapper } from "./styles";
import React from "react";
import { useNavigation } from "@react-navigation/native";

interface HeaderProps {
  title: string;
  subtitle: string;
  onBackPress?: () => void;
}

export function Header({ title, subtitle, onBackPress }: HeaderProps) {
  const subtitleLines = subtitle.split(/\r?\n/);

  const navigation = useNavigation();

  return (
    <Container>
      <TitleWrapper>
        <Title>{title}</Title>
        <BackButton onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#2196f3" />
        </BackButton>
      </TitleWrapper>
      {subtitleLines.map((line, index) => (
        <Subtitle key={index}>{line}</Subtitle>
      ))}
    </Container>
  );
}
