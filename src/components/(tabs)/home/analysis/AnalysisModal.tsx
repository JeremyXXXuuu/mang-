import { TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Incubator, WheelPicker, WheelPickerAlign } from "react-native-ui-lib";
import _ from "lodash";
import { FontAwesome } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { UserBody, upsertUserBody } from "@/src/db";
import { useColorScheme } from "@/src/components/useColorScheme";
import Colors from "@/src/constants/Colors";
import { View, Text, TextInput } from "@/src/components/Themed";

type AnalysisModalBase = {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
};

const Items = _.times(21, (i) => i * 5).map((day) => ({
  label: `${day}`,
  value: day,

  align: WheelPickerAlign.RIGHT,
}));

export const AnalysisModal = ({
  showDialog,
  setShowDialog,
  base,
  setBase,
  date,
}: {
  showDialog: boolean;
  setShowDialog: Function;
  base: AnalysisModalBase;
  setBase: Function;
  date: string;
}) => {
  const [carbs, setCarbs] = useState(50);
  const [protein, setProtein] = useState(30);
  const [fat, setFat] = useState(20);
  const [calories, setCalories] = useState(2000);

  const theme = useColorScheme() ?? "light";
  const backgroundColor =
    theme === "light" ? Colors.light.background : Colors.dark.background;

  useEffect(() => {
    setCarbs(base.carbs);
    setProtein(base.protein);
    setFat(base.fat);
    setCalories(base.calories);
  }, [base]);

  const onDialogDismissed = useCallback(() => {
    setShowDialog(false);
  }, []);

  const checkPicker = useCallback(() => {
    if (fat + carbs + protein == 100) {
      setShowDialog(false);
      setBase(
        _.cloneDeep({
          calories: calories,
          carbs: carbs,
          protein: protein,
          fat: fat,
        })
      );

      const userBodyData: UserBody = {
        date: date,
        weight: 0,
        height: 0,
        body_fat_percentage: 0,
        calories: 0,
        macros: JSON.stringify({
          carbs: 0,
          protein: 0,
          fat: 0,
        }),
        calories_goal: calories,
        macros_goal: JSON.stringify({
          carbs: carbs,
          protein: protein,
          fat: fat,
        }),
        activity: "",
        notes: "",
      };
      console.log(userBodyData);
      upsertUserBody(userBodyData);
    } else {
      alert("The sum of the values must be 100");
    }
  }, [fat, carbs, protein, calories, setBase, date]);

  return (
    <View>
      <GestureHandlerRootView>
        <Incubator.Dialog
          width={"90%"}
          bottom
          visible={showDialog}
          onDismiss={onDialogDismissed}
          headerProps={{
            showKnob: false,
            showDivider: false,
          }}
          containerStyle={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: backgroundColor,
            alignItems: "center",
          }}
        >
          <Incubator.Dialog.Header
            title={"Total: " + (carbs + protein + fat) + "%"}
            titleStyle={{
              textAlign: "center",
              color: carbs + protein + fat == 100 ? "green" : "red",
            }}
            topAccessory={
              <View className="flex flex-row justify-between w-full">
                <TouchableOpacity onPress={onDialogDismissed} className="mx-2">
                  <FontAwesome name="close" size={24} color="black" />
                </TouchableOpacity>

                <View>
                  <Text>Set Calories:</Text>
                  <TextInput
                    className="text-center mt-1"
                    value={calories.toString()}
                    onChangeText={(value) => setCalories(Number(value))}
                    keyboardType="numeric"
                  />
                </View>

                <TouchableOpacity
                  onPress={checkPicker}
                  accessibilityRole="button"
                  className="mx-2"
                >
                  <FontAwesome name="check" size={24} color="black" />
                </TouchableOpacity>
              </View>
            }
          />

          <View className="flex flex-row ">
            <WheelPicker
              initialValue={carbs}
              label={"%"}
              items={Items}
              onChange={(value) => setCarbs(value as number)}
              activeTextColor={"#FFC53D"}
              // style={{
              //   backgroundColor: "gray",
              // }}
              // faderProps={{
              //   size: 50,
              //   tintColor: "black",
              // }}
            />
            <WheelPicker
              initialValue={protein}
              label={"%"}
              items={Items}
              onChange={(value) => setProtein(value as number)}
              activeTextColor={"#FFC53D"}
              // style={{
              //   backgroundColor: "gray",
              // }}
              // faderProps={{
              //   size: 50,
              //   tintColor: "black",
              // }}
            />
            <WheelPicker
              initialValue={fat}
              label={"%"}
              items={Items}
              onChange={(value) => setFat(value as number)}
              activeTextColor={"#FFC53D"}
              // style={{
              //   backgroundColor: "gray",
              // }}
              // faderProps={{
              //   size: 50,
              //   tintColor: "black",
              // }}
              // separatorsStyle={{ backgroundColor: "#FFC53D" }}
            />
          </View>
        </Incubator.Dialog>
      </GestureHandlerRootView>
    </View>
  );
};
