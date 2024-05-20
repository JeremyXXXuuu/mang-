import { View, Text } from "@/src/components/Themed";
import React from "react";
import { Image } from "expo-image";
import { Pressable } from "react-native";
import { router } from "expo-router";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

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
    <View className="flex flex-row w-48 justify-between">
      <View className="flex flex-row">
        <Text className=" font-bold	">{props.calories} </Text>
        <FontAwesome6 name="fire" size={16} color="black" />
      </View>
      <Text className=" font-semibold	">{props.C}C</Text>
      <Text className=" font-semibold	">{props.P}P</Text>
      <Text className=" font-semibold	">{props.F}F</Text>
    </View>
  );
};

const onPress = (id: string) => {
  router.push(`/modal/food/${id}`);
};

const FoodItem = (props: FoodItemProps) => {
  return (
    <Pressable onPress={() => onPress(props.id)}>
      <View className="flex flex-row p-2">
        <View>
          <Image
            source={{ uri: props.picture }}
            style={{ width: 150, height: 100 }}
            className="rounded-lg mr-6"
          />
        </View>
        <View className="flex flex-col justify-between pt-2">
          <Text className=" font-semibold	">{props.name}</Text>
          <View className="w-full">
            <CaloriesMacros
              calories={props.calories}
              C={props.macros?.C}
              P={props.macros?.P}
              F={props.macros?.F}
            />
          </View>

          <View className="flex flex-row w-48 justify-between">
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

          <Text>{props.location}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default FoodItem;
