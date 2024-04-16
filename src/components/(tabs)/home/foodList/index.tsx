import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import * as SQLite from "expo-sqlite";
import FoodItem, { FoodItemProps } from "./foodItem";
const DATA: FoodItemProps[] = [
  //generate random data
  {
    id: "1",
    picture: "https://picsum.photos/200",
    name: "Burger",
    calories: 200,
    macros: {
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
    macros: {
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
    macros: {
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
    macros: {
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
    macros: {
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
    macros: {
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
    macros: {
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
    macros: {
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
  const [db, setDb] = useState<SQLite.WebSQLDatabase>(
    SQLite.openDatabase("db.db")
  );
  const [foodList, setFoodList] = useState<FoodItemProps[]>([]);

  useEffect(() => {
    //fetch food list from db
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM FOOD",
        [],
        (_, { rows }) => {
          // macros is a string in the db, we need to parse it
          rows._array.forEach((food: any) => {
            food.macros = JSON.parse(food.macros);
          });
          // time is a string in the db, we need to parse it
          // rows._array.forEach((food: any) => {
          //   food.time = new Date(food.time);
          // });
          setFoodList(rows._array);
          console.log("food list", rows._array[0].macros);
          console.log(foodList);
        },
        (_, error) => {
          console.log(error);
          return true;
        }
      );
    });
  }, []);

  return (
    <View className="flex flex-row">
      <FlatList
        data={foodList}
        renderItem={({ item, index }) => <FoodItem {...item} />}
        // estimatedItemSize={50}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View className="h-2 bg-gray-200" />}
        contentContainerStyle={{ paddingBottom: 200, paddingTop: 10 }}
      />
    </View>
  );
};
