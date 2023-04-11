import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Welcome } from "../screens/Welcome ";
import { SignUp } from "../screens/SignUp";
import { Login } from "../screens/Login";
import { ForgotPassword } from "../screens/ForgotPassword";
import { Main } from "../screens/Main";

const { Screen, Navigator } = createNativeStackNavigator();

async function getInitialScreen() {
  const token = await AsyncStorage.getItem("token");
  console.log(token);
  return token ? "Main" : "Welcome";
}

export function StackRoutes() {
  const [initialScreen, setInitialScreen] = useState<string | null>(null);

  useEffect(() => {
    async function checkToken() {
      const screen = await getInitialScreen();
      setInitialScreen(screen);
    }
    checkToken();
  }, []);

  if (!initialScreen) {
    return null;
  }

  return (
    <Navigator initialRouteName={initialScreen as string}>
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
