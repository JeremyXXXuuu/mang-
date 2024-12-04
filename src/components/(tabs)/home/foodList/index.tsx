import React, { useState, useCallback } from "react";
import { FlatList, TouchableOpacity, View, ScrollView } from "react-native";
import { FlashList } from "@shopify/flash-list";
import FoodItem, { FoodItemProps } from "./foodItem";
import { useNavigation, useFocusEffect, router } from "expo-router";
import { Analysis } from "@/src/components/(tabs)/home/analysis/Analysis";
import { AnalysisModal } from "@/src/components/(tabs)/home/analysis/AnalysisModal";

import { queryUserBodyByDate, queryFoodByDate } from "@/src/db";
import _, { set } from "lodash";

type AnalysisModalBase = {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
};
const defaultBase: AnalysisModalBase = {
  calories: 2000,
  carbs: 50,
  protein: 30,
  fat: 20,
};

export const FoodList = ({ date }: { date: string }) => {
  const [foodList, setFoodList] = useState<FoodItemProps[]>([]);

  const [base, setBase] = useState<AnalysisModalBase>(defaultBase);
  const navigation = useNavigation();
  const focused = navigation.isFocused();

  useFocusEffect(
    useCallback(() => {
      console.log("useFocusEffect");
      queryFoodByDate(date)
        .then((data) => {
          setFoodList(data);
        })
        .catch((error) => {
          console.error(error);
        });
      queryUserBodyByDate(date)
        .then((data) => {
          console.log(data);
          data.macros_goal = JSON.parse(data.macros_goal);
          console.log(data.macros_goal);
          setBase({
            calories: data.calories_goal,
            carbs: data.macros_goal.carbs,
            protein: data.macros_goal.protein,
            fat: data.macros_goal.fat,
          });
        })
        .catch((error) => {
          // alert("Please set your body data first");
          setBase(defaultBase);

          console.log("food page index", error);
        });
    }, [date])
  );
  const [showDialog, setShowDialog] = useState(false);

  const onAnalysisPress = useCallback(() => {
    setShowDialog(true);
  }, []);

  return (
    <FlatList
      data={foodList}
      renderItem={({ item }) => <FoodItem {...item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <>
          <TouchableOpacity onPress={onAnalysisPress}>
            <Analysis data={foodList} base={base} />
          </TouchableOpacity>

          <AnalysisModal
            showDialog={showDialog}
            setShowDialog={setShowDialog}
            base={base}
            setBase={setBase}
            date={date}
          />
        </>
      }
      contentContainerStyle={{ paddingBottom: 200, paddingTop: 10 }}
    />
  );
};
