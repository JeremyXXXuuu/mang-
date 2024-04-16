import { View, Text, Pressable } from "react-native";
import React from "react";
import Colors from "@/src/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

const AddButton = ({ onPress }: { onPress: () => any }) => {
  return (
    <Pressable
      onPress={() => {
        onPress();
      }}
      accessibilityRole="button"
    >
      <FontAwesome name="plus" size={30} />
    </Pressable>
  );
};

export default AddButton;
