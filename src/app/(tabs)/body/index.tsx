import { View, Text } from "@/src/components/Themed";
import React from "react";
import AddButton from "@/src/components/(tabs)/AddButton";
import { router } from "expo-router";

const body = () => {
  function addBody() {
    router.push("/modal/body");
  }
  return <></>;
};

export default body;
