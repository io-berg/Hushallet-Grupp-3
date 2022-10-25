import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import TaskHeader from "../components/TaskHeader";
import { statisticsData } from "../utils/statisics";

export default function ThisWeekScreen({ data }: { data: statisticsData }) {
  return (
    <View style={styles.container}>
      <TaskHeader title="Nuvarande vecka" />
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
            // absolute
            // center={[10, 50]}
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
    backgroundColor: "#fcfcfc",
    flex: 1,
  },
  title: {
    fontSize: 20,
    // fontWeight: "bold",
  },
});
