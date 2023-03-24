import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Register } from "../screens/Register";
import { Welcome } from "../screens/Welcome ";

const { Screen, Navigator } = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Navigator>
      <Screen name="Welcome" component={Welcome} />
      <Screen name="Register" component={Register} />
    </Navigator>
  );
}
