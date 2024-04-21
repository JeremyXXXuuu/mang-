import React, { useState, useCallback } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import FoodItem, { FoodItemProps } from "./foodItem";
import { useNavigation, useFocusEffect } from "expo-router";
import { Analysis } from "@/src/components/(tabs)/home/analysis/Analysis";
import { AnalysisModal } from "@/src/components/(tabs)/home/analysis/AnalysisModal";

import { queryFoodByDate } from "@/src/db";

export const MyList = ({ date }: { date: string }) => {
  const [foodList, setFoodList] = useState<FoodItemProps[]>([]);
  const [base, setBase] = useState({
    calories: 0,
    carbs: 0,
    protein: 0,
    fat: 0,
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
    }, [date])
  );
  const [showDialog, setShowDialog] = useState(false);

  const onAnalysisPress = useCallback(() => {
    setShowDialog(true);
  }, []);

  return (
    <View className="flex flex-col">
      <TouchableOpacity onPress={onAnalysisPress}>
        <Analysis data={foodList} base={base} />
      </TouchableOpacity>

      <AnalysisModal
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        setBase={setBase}
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
  );
};
