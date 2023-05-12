import { createDrawerNavigator } from "@react-navigation/drawer";

import { CustomDrawerNavigator } from "../components/CustomDrawerNavigator";

import { Main } from "../screens/Main";
import { DailyWaterIntake } from "../screens/DailyWaterIntake";
import { WaterIntakeReport } from "../screens/WaterIntakeReport";
import { Profile } from "../screens/Profile";

const Drawer = createDrawerNavigator();

export function DrawerRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerContent={CustomDrawerNavigator}
    >
      <Drawer.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="DailyWaterIntake"
        component={DailyWaterIntake}
        options={{ headerShown: false }}
      />
      <Drawer.Screen name="WaterIntakeReport" component={WaterIntakeReport} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}
