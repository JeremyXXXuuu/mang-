import { View, Text } from "@/src/components/Themed";
import React from "react";
import { Redirect } from "expo-router";

const index = () => {
  return <Redirect href="/(tabs)/home/" />;
};

export default index;
