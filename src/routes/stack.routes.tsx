import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screens/Login";
import { SignUp } from "../screens/SignUp";
import { Welcome } from "../screens/Welcome ";
import { ForgotPassword } from "../screens/ForgotPassword";

const { Screen, Navigator } = createNativeStackNavigator();

export function StackRoutes() {
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
    </Navigator>
  );
}
