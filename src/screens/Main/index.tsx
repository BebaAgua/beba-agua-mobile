import { StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Container, Test } from "./styles";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import UserContext from "../../contexts/UserContext";
import { useContext } from "react";

const removeTokeAndUser = async () => {
  try {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("goal");
  } catch (error) {
    console.log("Error removing token, user or goal", error);
  }
};

export function Main() {
  const { goal, user } = useContext(UserContext);
  console.log("Goal: ", goal);
  const navigation = useNavigation();

  const handleLogout = () => {
    removeTokeAndUser();
    console.log("User logged out");
    navigation.reset({ routes: [{ name: "Welcome" as never }] });
  };

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f8ff" />
      <Button title="Sair" size={300} color="#333766" onPress={handleLogout} />
      <Test>{goal} ml</Test>
      <Test>{user?.name}</Test>
    </Container>
  );
}
