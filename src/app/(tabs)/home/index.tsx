import { View, Text } from "react-native";
import React, { useState } from "react";
import AddButton from "@/src/components/(tabs)/AddButton";
import { router } from "expo-router";
import { Calendar, LocaleConfig } from "react-native-calendars";
import ExpandableCalendarScreen from "@/src/components/(tabs)/home/calendar/ExpandableCalendar";
const home = () => {
  function addFood() {
    router.push("/modal/food");
  }
  const [selected, setSelected] = useState("");
  return (
    <View className="h-full">
      <ExpandableCalendarScreen />

      <View className="absolute bottom-0 right-0 m-3">
        <AddButton onPress={addFood} />
      </View>
    </View>
  );
};

export default home;
