import { View, Text } from "react-native";
import React from "react";
import AddButton from "@/src/components/(tabs)/AddButton";
import { router } from "expo-router";
const home = () => {
  function addFood() {
    router.push("/modal/food");
  }

  return (
    <View className="text-2xl rounded-md border-2">
      <Text className="text-2xl rounded-md border-2">home</Text>
      <View>
        <AddButton onPress={addFood} />
      </View>
    </View>
  );
};

export default home;
