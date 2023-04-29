import Icon from "@expo/vector-icons/FontAwesome";
import { BackButton, Container, Subtitle, Title, TitleWrapper } from "./styles";
import { useNavigation } from "@react-navigation/native";
import theme from "../../global/styles/theme";

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
          <Icon name="arrow-left" size={24} color={theme.colors.secondary} />
        </BackButton>
      </TitleWrapper>
      {subtitleLines.map((line, index) => (
        <Subtitle key={index}>{line}</Subtitle>
      ))}
    </Container>
  );
}
