import { Text, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import {
  View,
  Incubator,
  WheelPicker,
  WheelPickerAlign,
} from "react-native-ui-lib";
import _ from "lodash";
import { FontAwesome } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TextInput } from "@/src/components/Themed";

const Repas = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snack",
  "Pre Workout",
  "Post Workout",
].map((repas) => ({
  label: `${repas}`,
  value: repas,
  align: WheelPickerAlign.CENTER,
}));

const SelectRepas = ({
  showDialog,
  setShowDialog,
  setRepas,
}: {
  showDialog: boolean;
  setShowDialog: Function;
  setRepas: Function;
}) => {
  const [selectedRepas, setSelectedRepas] = useState("Breakfast");
  const onDialogDismissed = useCallback(() => {
    setShowDialog(false);
  }, []);

  const onDialogConfirm = useCallback(() => {
    setRepas(selectedRepas);
    setShowDialog(false);
  }, [selectedRepas]);

  return (
    <View>
      <GestureHandlerRootView>
        <Incubator.Dialog
          visible={showDialog}
          onDismiss={onDialogDismissed}
          containerStyle={{ height: 200 }}
          bottom
          headerProps={{
            showKnob: false,
            showDivider: false,
          }}
        >
          <Incubator.Dialog.Header
            topAccessory={
              <View row className="justify-between">
                <TouchableOpacity onPress={onDialogDismissed} className="mx-2">
                  <FontAwesome name="close" size={24} color="black" />
                </TouchableOpacity>

                <View>
                  <Text>Select Meals</Text>
                </View>

                <TouchableOpacity
                  onPress={onDialogConfirm}
                  accessibilityRole="button"
                  className="mx-2"
                >
                  <FontAwesome name="check" size={24} color="black" />
                </TouchableOpacity>
              </View>
            }
          />

          <WheelPicker
            items={Repas}
            initialValue={selectedRepas}
            onChange={(value) => setSelectedRepas(value)}
            activeTextColor={"#FFC53D"}
          />
        </Incubator.Dialog>
      </GestureHandlerRootView>
    </View>
  );
};

export default SelectRepas;
