import { View, Text } from "react-native";
import React from "react";
import AddButton from "@/src/components/(tabs)/AddButton";
import { router } from "expo-router";

const body = () => {
  function addBody() {
    router.push("/modal/body");
  }
  return (
    <View>
      <Text>body</Text>
      <AddButton onPress={addBody} />
    </View>
  );
};

export default body;
