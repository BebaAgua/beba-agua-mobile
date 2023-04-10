import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import { Login } from "../screens/Login";
import { SignUp } from "../screens/SignUp";
import { Welcome } from "../screens/Welcome ";
import { ForgotPassword } from "../screens/ForgotPassword";
import { Main } from "../screens/Main";

const { Screen, Navigator } = createNativeStackNavigator();

export function StackRoutes() {
  const navigation = useNavigation();

  useEffect(() => {
    async function checkToken() {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        navigation.reset({ routes: [{ name: "Main" as never }] });
      } else {
        navigation.reset({ routes: [{ name: "Welcome" as never }] });
      }
    }
    checkToken();
  }, []);

  return (
    <Navigator>
      <Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <Screen name="Main" component={Main} options={{ headerShown: false }} />
    </Navigator>
  );
}
