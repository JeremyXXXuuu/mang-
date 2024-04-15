import React from "react";
import { FlatList, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import FoodItem, { FoodItemProps } from "./foodItem";
const DATA: FoodItemProps[] = [
  //generate random data
  {
    id: "1",
    picture: "https://picsum.photos/200",
    name: "Burger",
    calories: 200,
    micros: {
      C: 20,
      P: 10,
      F: 5,
    },
    repas: "lunch",
    time: "12:00",
    location: "Home",
    user_id: "1",
  },
  {
    id: "2",
    picture: "https://picsum.photos/200",
    name: "Pizza",
    calories: 300,
    micros: {
      C: 30,
      P: 15,
      F: 10,
    },
    repas: "dinner",
    time: "19:00",
    location: "Home",
    user_id: "1",
  },
  {
    id: "3",
    picture: "https://picsum.photos/200",
    name: "Salad",
    calories: 100,
    micros: {
      C: 10,
      P: 5,
      F: 2,
    },
    repas: "lunch",
    time: "12:00",
    location: "Home",
    user_id: "1",
  },
  {
    id: "4",
    picture: "https://picsum.photos/200",
    name: "Pasta",
    calories: 250,
    micros: {
      C: 25,
      P: 12.5,
      F: 7.5,
    },
    repas: "dinner",
    time: "19:00",
    location: "Home",
    user_id: "1",
  },

  {
    id: "5",
    picture: "https://picsum.photos/200",
    name: "Pasta",
    calories: 250,
    micros: {
      C: 25,
      P: 12.5,
      F: 7.5,
    },
    repas: "dinner",
    time: "19:00",
    location: "Home",
    user_id: "1",
  },
  {
    id: "6",
    picture: "https://picsum.photos/200",
    name: "Pasta",
    calories: 250,
    micros: {
      C: 25,
      P: 12.5,
      F: 7.5,
    },
    repas: "dinner",
    time: "19:00",
    location: "Home",
    user_id: "1",
  },
  {
    id: "7",
    picture: "https://picsum.photos/200",
    name: "Pasta",
    calories: 250,
    micros: {
      C: 25,
      P: 12.5,
      F: 7.5,
    },
    repas: "dinner",
    time: "19:00",
    location: "Home",
    user_id: "1",
  },
  {
    id: "8",
    picture: "https://picsum.photos/200",
    name: "last item",
    calories: 250,
    micros: {
      C: 25,
      P: 12.5,
      F: 7.5,
    },
    repas: "dinner",
    time: "19:00",
    location: "Home",
    user_id: "1",
  },
];

export const MyList = () => {
  return (
    <View className="flex flex-row">
      <FlatList
        data={DATA}
        renderItem={({ item, index }) => <FoodItem {...item} />}
        // estimatedItemSize={50}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View className="h-2 bg-gray-200" />}
        contentContainerStyle={{ paddingBottom: 200, paddingTop: 10 }}
      />
    </View>
  );
};
