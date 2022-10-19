import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../screens/HomeScreen";
import Statistics1Screen from "../screens/Statistics1";
import Statistics2Screen from "../screens/Statistics2";
import Statistics3Screen from "../screens/Statistics3";
import Statistics4Screen from "../screens/Statistics4";

const Tab = createMaterialTopTabNavigator();

export function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Hem" component={HomeScreen} />
      <Tab.Screen name="statistik 1" component={Statistics1Screen} />
      <Tab.Screen name="statistik 2" component={Statistics2Screen} />
      <Tab.Screen name="statistik 3" component={Statistics3Screen} />
      <Tab.Screen name="statistik 4" component={Statistics4Screen} />
    </Tab.Navigator>
  );
}
