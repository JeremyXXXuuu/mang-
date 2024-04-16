import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { Text, View } from "@/src/components/Themed";
import Food from "@/src/components/(tabs)/home/Food";

export default function FoodModalScreen() {
  const { id } = useLocalSearchParams() as { id: string };

  console.log(id);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food modal page</Text>
      <View />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />

      <Food id={id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
