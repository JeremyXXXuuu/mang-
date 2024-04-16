import { View, Text } from "@/src/components/Themed";
import React from "react";
import { Image } from "expo-image";
import { Pressable } from "react-native";
import { router } from "expo-router";

export type FoodItemProps = {
  id: string;
  picture: string;
  name: string;
  calories: number;
  macros: {
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
  console.log(props);
  return (
    <View className="flex flex-row gap-2">
      <Text>{props.calories} Kcal</Text>
      <Text>{props.C || 0} g</Text>
      <Text>{props.P || 0} g</Text>
      <Text>{props.F || 0} g</Text>
    </View>
  );
};

const onPress = (id: string) => {
  console.log("pressed");
  router.push(`/modal/food/${id}`);
};

const FoodItem = (props: FoodItemProps) => {
  console.log("foodItem", props);
  return (
    <Pressable onPress={() => onPress(props.id)}>
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
            C={props.macros.C}
            P={props.macros.P}
            F={props.macros.F}
          />

          <Text>{props.location}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default FoodItem;
