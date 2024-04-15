import { View, Text } from "@/src/components/Themed";
import React from "react";
import { Image } from "expo-image";

export type FoodItemProps = {
  id: string;
  picture: string;
  name: string;
  calories: number;
  micros: {
    C: number;
    P: number;
    F: number;
  };
  repas: "lunch" | "dinner" | "breakfast" | "snack";
  time: string;
  location: string;
  user_id: string;
};

const CaloriesMacros = (props: {
  calories: number;
  C: number;
  P: number;
  F: number;
}) => {
  return (
    <View className="flex flex-row gap-2">
      <Text>{props.calories} Kcal</Text>
      <Text>{props.C} g</Text>
      <Text>{props.P} g</Text>
      <Text>{props.F} g</Text>
    </View>
  );
};

const FoodItem = (props: FoodItemProps) => {
  return (
    <View className="flex flex-row gap-2">
      <View>
        <Image
          source={{ uri: props.picture }}
          style={{ width: 200, height: 200 }}
        />
      </View>
      <View className="flex flex-col">
        <Text className="p-1">{props.name}</Text>
        <View className="flex flex-row p-2 gap-1">
          <Text>{props.repas}</Text>
          <Text>{props.time}</Text>
        </View>
        <CaloriesMacros
          calories={props.calories}
          C={props.micros.C}
          P={props.micros.P}
          F={props.micros.F}
        />

        <Text>{props.location}</Text>
      </View>
    </View>
  );
};

export default FoodItem;
