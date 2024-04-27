import React, { useState, useCallback } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import FoodItem, { FoodItemProps } from "./foodItem";
import { useNavigation, useFocusEffect, router } from "expo-router";
import { Analysis } from "@/src/components/(tabs)/home/analysis/Analysis";
import { AnalysisModal } from "@/src/components/(tabs)/home/analysis/AnalysisModal";

import { getAllUserBody, getUserBody, queryFoodByDate } from "@/src/db";
import _ from "lodash";

type AnalysisModalBase = {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
};

export const MyList = ({ date }: { date: string }) => {
  const [foodList, setFoodList] = useState<FoodItemProps[]>([]);

  const [base, setBase] = useState<AnalysisModalBase>({
    calories: 2000,
    carbs: 50,
    protein: 30,
    fat: 20,
  });
  const navigation = useNavigation();
  const focused = navigation.isFocused();

  useFocusEffect(
    useCallback(() => {
      queryFoodByDate(date)
        .then((data) => {
          setFoodList(data);
        })
        .catch((error) => {
          console.error(error);
        });
      getUserBody(date)
        .then((data) => {
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
          console.log(error);
        });
    }, [date])
  );
  const [showDialog, setShowDialog] = useState(false);

  const onAnalysisPress = useCallback(() => {
    setShowDialog(true);
  }, []);

  return (
    <View>
      <View className="flex flex-col">
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
    </View>
  );
};
