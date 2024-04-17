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
  return (
    <View className="flex flex-row gap-2">
      <Text>{props.calories} cal</Text>
      <Text>{props.C}g C </Text>
      <Text>{props.P}g P</Text>
      <Text>{props.F}g F</Text>
    </View>
  );
};

const onPress = (id: string) => {
  router.push(`/modal/food/${id}`);
};

const FoodItem = (props: FoodItemProps) => {
  return (
    <Pressable onPress={() => onPress(props.id)}>
      <View className="flex flex-row gap-2 p-2 ">
        <View>
          <Image
            source={{ uri: props.picture }}
            style={{ width: 150, height: 150 }}
            className="rounded-lg"
          />
        </View>
        <View className="flex flex-col justify-evenly">
          <Text className="text-md">{props.name}</Text>

          <View className="flex flex-row gap-2">
            <Text>{props.repas}</Text>
            <Text>
              {props.time
                .split("T")[1]
                .split("Z")[0]
                .split(":")
                .slice(0, 2)
                .join(":")}
            </Text>
          </View>

          <View>
            <CaloriesMacros
              calories={props.calories}
              C={props.macros?.C}
              P={props.macros?.P}
              F={props.macros?.F}
            />
          </View>

          <Text>{props.location}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default FoodItem;
