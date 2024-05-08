import { View } from "@/src/components/Themed";
import React from "react";
import { router } from "expo-router";
import { ExpandableCalendarScreen } from "@/src/components/(tabs)/home/calendar/ExpandableCalendar";

const home = () => {
  function addFood() {
    router.push("/modal/food/new");
  }
  return (
    <View className="h-full">
      <ExpandableCalendarScreen />
    </View>
  );
};

export default home;
