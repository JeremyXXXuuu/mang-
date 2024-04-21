import { View, Text } from "react-native";
import React from "react";
import CircularProgress, {
  CircularProgressBase,
} from "react-native-circular-progress-indicator";
import { FoodItemProps } from "../foodList/foodItem";

type Base = {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
};

const DURATION = 800;

export const Analysis = ({
  data,
  base,
}: {
  data: FoodItemProps[];
  base: Base;
}) => {
  const calories = data.reduce((acc, food) => acc + food.calories, 0);
  const C = data.reduce((acc, food) => acc + food.macros.C, 0);
  const P = data.reduce((acc, food) => acc + food.macros.P, 0);
  const F = data.reduce((acc, food) => acc + food.macros.F, 0);

  const totalCalories = base.calories;
  const totalC = base.carbs;
  const totalP = base.protein;
  const totalF = base.fat;

  return (
    <View className="flex flex-row justify-evenly mt-2">
      <CircularProgress
        value={totalCalories == 0 ? 0 : (calories / totalCalories) * 100}
        radius={44}
        title="Calories"
        duration={DURATION}
        progressValueColor={"#BBBBBB"}
        activeStrokeColor={"#FFC53D"} // Amber 9
        inActiveStrokeColor={"#E0E0E0"}
        inActiveStrokeOpacity={0.5}
        subtitle={`${calories}/${totalCalories}`}
        inActiveStrokeWidth={12}
        activeStrokeWidth={10}
        valueSuffix="%"
        progressValueStyle={{ fontSize: 18, fontWeight: "800" }}
        titleFontSize={12}
        titleStyle={{ fontWeight: "800" }}
        subtitleStyle={{ fontSize: 10, fontWeight: "500" }}
      />
      <CircularProgress
        value={totalF == 0 ? 0 : (F / totalF) * 100}
        radius={44}
        title="Fat"
        duration={DURATION}
        progressValueColor={"#BBBBBB"}
        activeStrokeColor={"#E592A3"} //Ruby 8
        inActiveStrokeColor={"#E0E0E0"}
        inActiveStrokeOpacity={0.5}
        subtitle={`${F}/${totalF}`}
        inActiveStrokeWidth={12}
        activeStrokeWidth={10}
        valueSuffix="%"
        progressValueStyle={{ fontSize: 18, fontWeight: "800" }}
        titleFontSize={12}
        titleStyle={{ fontWeight: "800" }}
        subtitleStyle={{ fontSize: 10, fontWeight: "500" }}
      />
      <CircularProgress
        value={totalC == 0 ? 0 : (C / totalC) * 100}
        radius={44}
        title="Carbs"
        duration={DURATION}
        progressValueColor={"#BBBBBB"}
        activeStrokeColor={"#9B9EF0"} //iris 8
        inActiveStrokeColor={"#E0E0E0"}
        inActiveStrokeOpacity={0.5}
        subtitle={`${C}/${totalC}`}
        inActiveStrokeWidth={12}
        activeStrokeWidth={10}
        valueSuffix="%"
        progressValueStyle={{ fontSize: 18, fontWeight: "800" }}
        titleFontSize={12}
        titleStyle={{ fontWeight: "800" }}
        subtitleStyle={{ fontSize: 10, fontWeight: "500" }}
      />
      <CircularProgress
        value={totalP == 0 ? 0 : (P / totalP) * 100}
        radius={44}
        title="Protein"
        duration={DURATION}
        progressValueColor={"#BBBBBB"}
        activeStrokeColor={"#56BA9F"} //jade 9
        inActiveStrokeColor={"#E0E0E0"}
        inActiveStrokeOpacity={0.5}
        subtitle={`${P}/${totalP}`}
        inActiveStrokeWidth={12}
        activeStrokeWidth={10}
        valueSuffix="%"
        progressValueStyle={{ fontSize: 18, fontWeight: "800" }}
        titleFontSize={12}
        titleStyle={{ fontWeight: "800" }}
        subtitleStyle={{ fontSize: 10, fontWeight: "500" }}
      />
    </View>
  );
};
