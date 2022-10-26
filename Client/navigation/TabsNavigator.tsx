import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { useTheme } from "react-native-paper";
import MyTabBar from "../components/SwipeNavigatorHeader";
import HomeScreen from "../screens/HomeScreen";
import LastMonthScreen from "../screens/LastMonth";
import LastWeekScreen from "../screens/LastWeek";
import ThisWeekScreen from "../screens/ThisWeek";
import { selectCurrentHousehold } from "../store/selectors";
import { useAppSelector } from "../store/store";
import {
  mapLastMonthsData,
  mapLastWeeksData,
  mapThisWeeksData,
  statisticsData,
} from "../utils/statisics";

export type TabsParamList = {
  Overview: undefined;
  LastWeek: { data: statisticsData };
  ThisWeek: { data: statisticsData };
  Statistics3: undefined;
  Statistics4: undefined;
};

const Tab = createMaterialTopTabNavigator<TabsParamList>();

export function TabNavigator() {
  const theme = useTheme();
  const profiles = useAppSelector(selectCurrentHousehold)?.profiles;
  const householdTasks = useAppSelector(selectCurrentHousehold)?.tasks;

  const thisWeekData = mapThisWeeksData(profiles, householdTasks, theme.colors.text);
  const lastWeekData = mapLastWeeksData(profiles, householdTasks, theme.colors.text);
  const lastMonthData = mapLastMonthsData(profiles, householdTasks, theme.colors.text);

  return (
    <Tab.Navigator screenOptions={{}} tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen name="Overview" component={HomeScreen} />
      {thisWeekData && thisWeekData.overallData.length > 0 && (
        <Tab.Screen name="ThisWeek">{() => <ThisWeekScreen data={thisWeekData} />}</Tab.Screen>
      )}
      {lastWeekData && lastWeekData.overallData.length > 0 && (
        <Tab.Screen name="LastWeek">{() => <LastWeekScreen data={lastWeekData} />}</Tab.Screen>
      )}
      {lastMonthData && lastMonthData.overallData.length > 0 && (
        <Tab.Screen name="Statistics3">{() => <LastMonthScreen data={lastMonthData} />}</Tab.Screen>
      )}
    </Tab.Navigator>
  );
}
