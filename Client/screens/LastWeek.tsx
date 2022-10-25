import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useTheme } from "react-native-paper";
import TaskHeader from "../components/TaskHeader";
import { statisticsData } from "../utils/statisics";

export default function LastWeekScreen({ data }: { data: statisticsData }) {
  const theme = useTheme();
  return (
    <View style={{ ...styles.container, backgroundColor: theme.colors.background }}>
      <TaskHeader title="Förra veckan" />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data.overallData && (
          <PieChart
            data={data.overallData}
            width={350}
            height={220}
            hasLegend={true}
            chartConfig={{
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {},
            }}
            accessor={"effortPoints"}
            backgroundColor={"transparent"}
            paddingLeft={"10"}
          />
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          marginTop: 20,
          flexWrap: "wrap",
          paddingHorizontal: 10,
        }}
      >
        {data.taskData?.map((task) => {
          if (task?.data) {
            return (
              <View
                key={task.name}
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <PieChart
                  data={task.data}
                  width={124}
                  height={124}
                  hasLegend={false}
                  chartConfig={{
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  }}
                  accessor={"effortPoints"}
                  backgroundColor={"transparent"}
                  paddingLeft={"30"}
                />
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 13,
                    flexWrap: "wrap",
                    overflow: "hidden",
                    textAlign: "center",
                    color: theme.colors.text,
                  }}
                >
                  {task.name}
                </Text>
              </View>
            );
          }
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
  },
});
