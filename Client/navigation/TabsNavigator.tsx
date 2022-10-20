import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../screens/HomeScreen";
import Statistics1Screen from "../screens/Statistics1";
import Statistics2Screen from "../screens/Statistics2";
import Statistics3Screen from "../screens/Statistics3";
import Statistics4Screen from "../screens/Statistics4";

type TabsParamList = {
  Overview: undefined;
  Statistics1: undefined;
  Statistics2: undefined;
  Statistics3: undefined;
  Statistics4: undefined;
};

const Tab = createMaterialTopTabNavigator<TabsParamList>();

export function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Overview" component={HomeScreen} />
      <Tab.Screen name="Statistics1" component={Statistics1Screen} />
      <Tab.Screen name="Statistics2" component={Statistics2Screen} />
      <Tab.Screen name="Statistics3" component={Statistics3Screen} />
      <Tab.Screen name="Statistics4" component={Statistics4Screen} />
    </Tab.Navigator>
  );
}
