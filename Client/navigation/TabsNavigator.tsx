import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HemScreen from "../screens/HemScreen";
import Statistik1Screen from "../screens/Statistik1";
import Stat1Screen from "../screens/Statistik1";
import Statistik2Screen from "../screens/Statistik2";
import Stat2Screen from "../screens/Statistik2";
import Statistik3Screen from "../screens/Statistik3";
import Statistik4Screen from "../screens/Statistik4";

const Tab = createMaterialTopTabNavigator();

export function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Hem" component={HemScreen} />
      <Tab.Screen name="statistik 1" component={Statistik1Screen} />
      <Tab.Screen name="statatistik 2" component={Statistik2Screen} />
      <Tab.Screen name="statistik 3" component={Statistik3Screen} />
      <Tab.Screen name="statistik 4" component={Statistik4Screen} />
    </Tab.Navigator>
  );
}
