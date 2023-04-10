import { StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Container } from "./styles";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("token");
  } catch (error) {
    console.log("Error removing token:", error);
  }
};

export function Main() {
  const navigation = useNavigation();

  const handleLogout = () => {
    removeToken();
    navigation.reset({ routes: [{ name: "Welcome" as never }] });
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f8ff" />
      <Button title="Sair" size={300} color="#333766" onPress={handleLogout} />
    </Container>
  );
}
