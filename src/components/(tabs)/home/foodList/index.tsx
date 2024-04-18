import React, { useEffect, useState, useCallback } from "react";
import { FlatList, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import * as SQLite from "expo-sqlite";
import FoodItem, { FoodItemProps } from "./foodItem";
import { useNavigation, useFocusEffect } from "expo-router";
import Analysis from "../foodList/Analysis/analysis";

// import FocusAwareStatusBar from "@/src/utils/FocusAwareStatusBar";

export const MyList = ({ date }: { date: string }) => {
  const [db, setDb] = useState<SQLite.WebSQLDatabase>(
    SQLite.openDatabase("db.db")
  );
  const [foodList, setFoodList] = useState<FoodItemProps[]>([]);
  const navigation = useNavigation();
  const focused = navigation.isFocused();

  useFocusEffect(
    useCallback(() => {
      db.transaction((tx) => {
        tx.executeSql(
          // "SELECT * FROM FOOD",
          // [],
          "SELECT * FROM FOOD WHERE time LIKE ?",
          [`${date}%`],
          (_, { rows }) => {
            // macros is a string in the db, we need to parse it
            rows._array.forEach((food: any) => {
              food.macros = JSON.parse(food.macros);
            });
            setFoodList(rows._array);
          },
          (_, error) => {
            console.log(error);
            return true;
          }
        );
      });
    }, [date, db])
  );

  return (
    <View className="flex flex-col">
      <Analysis data={foodList} />
      <View className="flex flex-row m-1">
        <FlatList
          data={foodList}
          renderItem={({ item, index }) => <FoodItem {...item} />}
          // estimatedItemSize={50}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View className="h-2 bg-gray-200" />}
          contentContainerStyle={{ paddingBottom: 500, paddingTop: 10 }}
        />
        {/* <FocusAwareStatusBar /> */}
      </View>
    </View>
  );
};
