import { View, Text } from "@/src/components/Themed";
import React from "react";
import { ExpandableCalendarScreen } from "@/src/components/(tabs)/home/calendar/ExpandableCalendar";
import {
  Colors,
  SegmentedControl,
  Assets,
  Spacings,
  BorderRadiuses,
  Typography,
} from "react-native-ui-lib";

const segments = {
  "FOOD&BODY": [{ label: "Food" }, { label: "Body" }],
};

import { MyList } from "./foodList";
import { Body } from "./body/Body";
import AddButton from "../AddButton";
import { router } from "expo-router";

export const Home = ({ date }: { date: string }) => {
  const [renderPage, setRenderPage] = React.useState("Food");
  const onChangeIndex = (index: number) => {
    console.log(index);
    setRenderPage(index === 0 ? "Food" : "Body");
  };
  function addFood() {
    router.push("/modal/food/new");
  }

  return (
    <View className="h-full">
      <SegmentedControl
        segments={segments["FOOD&BODY"]}
        backgroundColor="#f5f5f5"
        activeColor={Colors.blue30}
        activeBackgroundColor="#ffffff"
        borderRadius={BorderRadiuses.br100}
        containerStyle={{ margin: Spacings.s2 }}
        onChangeIndex={onChangeIndex}
      />
      {renderPage === "Food" ? <MyList date={date} /> : <Body date={date} />}
    </View>
  );
};
