import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import { Text, View } from "@/src/components/Themed";
import AddFood from "@/src/components/(tabs)/home/AddFood";

export default function FoodModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food modal page</Text>
      <View />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />

      <AddFood />
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
