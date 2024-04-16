import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import * as SQLite from "expo-sqlite";
import FoodItem, { FoodItemProps } from "./foodItem";
import { useNavigation, usePathname } from "expo-router";
// import FocusAwareStatusBar from "@/src/utils/FocusAwareStatusBar";

export const MyList = () => {
  const [db, setDb] = useState<SQLite.WebSQLDatabase>(
    SQLite.openDatabase("db.db")
  );
  const [foodList, setFoodList] = useState<FoodItemProps[]>([]);
  const navigation = useNavigation();
  const focused = navigation.isFocused();
  useEffect(() => {
    //fetch food list from db
    console.log(`Current page is focused: ${focused}, food list component`);
    if (focused) {
      console.log("fetching food list");
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
            console.log(foodList);
          },
          (_, error) => {
            console.log(error);
            return true;
          }
        );
      });
    }
  }, [focused]);

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
      {/* <FocusAwareStatusBar /> */}
    </View>
  );
};
