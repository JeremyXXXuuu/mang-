import { View, Text } from "@/src/components/Themed";
import React from "react";
import AddButton from "@/src/components/(tabs)/AddButton";
import { router } from "expo-router";
import SegmentedControlScreen from "@/src/components/(tabs)/home/SegmentedControl";

const body = () => {
  function addBody() {
    router.push("/modal/body");
  }
  return (
    <>
      <SegmentedControlScreen />
    </>
  );
};

export default body;
