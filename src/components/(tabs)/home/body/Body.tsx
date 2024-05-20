import {
  TextInput as DefaultTextInput,
  Pressable,
  Image,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
  Alert,
} from "react-native";
import { TextInput, Text, View } from "@/src/components/Themed";
import React, { useCallback, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";

const PlaceholderImage = require("@/assets/images/placeholderbody.png");

import { router, useFocusEffect } from "expo-router";
import * as db from "@/src/db";

export function ImageViewer({
  placeholderImageSource,
  selectedImage,
}: {
  placeholderImageSource: any;
  selectedImage: string | undefined;
}) {
  const imageSource = selectedImage
    ? { uri: selectedImage }
    : placeholderImageSource;
  return (
    <Image
      source={imageSource}
      style={{ width: 200, height: 200, alignSelf: "center", borderRadius: 16 }}
    />
  );
}

export function Button({
  label,
  theme,
  onPress,
  className,
}: {
  label: string;
  theme?: string;
  onPress: () => void;
  className?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="border-2 rounded-md border-black text-center p-2 m-2 bg-gray-200"
    >
      <Text>{label}</Text>
    </Pressable>
  );
}

export const Body = ({ date }: { date: string }) => {
  const [image, setImage] = useState<string | undefined>(undefined);

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bodyFat, setBodyFat] = useState("");

  useFocusEffect(
    useCallback(() => {
      db.queryUserBodyByDate(date)
        .then((data) => {
          console.log(data);
          setImage(data.picture);
          setWeight(data.weight.toString());
          setHeight(data.height.toString());
          setBodyFat(data.body_fat_percentage.toString());
        })
        .catch((error) => {
          setImage(undefined);
          setWeight("");
          setBodyFat("");
          console.log(error);
        });
    }, [date])
  );

  function saveBodyData() {
    console.log("save body data");
    db.upsertUserBody({
      date: date,
      picture: image?.toString() || "",
      weight: Number(weight),
      height: Number(height),
      body_fat_percentage: Number(bodyFat),
      calories: 0,
      macros: "",
      calories_goal: 0,
      macros_goal: "",
      activity: "",
      notes: "",
    }).catch((error) => {
      console.log(error);
    });
  }

  function deleteBodyData() {
    db.deleteUserBodyByDate(date).catch((error) => {
      console.log(error);
    });
  }

  function showBodyData() {
    console.log("show body data");
    db.queryUserBodyByDate(date)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const askUser = () => {
    Alert.alert(
      "Choose an option",
      "Would you like to take a photo or choose from your library?",
      [
        {
          text: "Take Photo",
          onPress: () => takePictureAsync(),
        },
        {
          text: "Choose from Library",
          onPress: () => pickImageAsync(),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const takePictureAsync = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      // Get the local URI of the image
      let localUri = result.assets[0].uri;

      // Generate a new filename and path
      let filename = localUri.split("/").pop();
      console.log(filename);
      console.log(localUri);
      setImage(localUri);
    } else {
      alert("You did not take any photo.");
    }
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      // Get the local URI of the image
      let localUri = result.assets[0].uri;

      // Generate a new filename and path
      let filename = localUri.split("/").pop();
      console.log(filename);
      console.log(localUri);
      setImage(localUri);
    } else {
      alert("You did not select any image.");
    }
  };

  const [keyboardShown, setKeyboardShown] = useState(false);

  useEffect(() => {
    // Add listeners for keyboard show/hide events
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardShown(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardShown(false);
      }
    );

    // Clean up the listeners when the component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = function (event: any) {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    if (currentScrollY < scrollY && keyboardShown) {
      // User is scrolling down
      Keyboard.dismiss();
    }
    setScrollY(currentScrollY);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
      keyboardVerticalOffset={65}
      style={{ marginBottom: 200 }}
    >
      <ScrollView
        className="flex flex-col gap-3 p-2 m-2"
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View>
          <Pressable onPress={askUser}>
            <ImageViewer
              placeholderImageSource={PlaceholderImage}
              selectedImage={image}
            />
          </Pressable>

          <View className="flex flex-col">
            <Text>Height(cm)</Text>
            <TextInput
              placeholder="Height"
              onChangeText={(text) => {
                // 将逗号替换为点
                text = text.replace(",", ".");
                // 只允许数字和小数点，并且最多两位小数
                const regex = /^\d*\.?\d{0,2}$/;
                if (regex.test(text)) {
                  setHeight(text);
                }
              }}
              value={height.toString()}
              keyboardType="decimal-pad"
              style={{ fontSize: 20, marginVertical: 12, height: 36 }}
            />
          </View>
          <View className="flex flex-col">
            <Text>Weight(kg)</Text>
            <TextInput
              placeholder="Weight"
              onChangeText={(text) => {
                // 将逗号替换为点
                text = text.replace(",", ".");
                // 只允许数字和小数点，并且最多两位小数
                const regex = /^\d*\.?\d{0,2}$/;
                if (regex.test(text)) {
                  setWeight(text);
                }
              }}
              value={weight.toString()}
              keyboardType="numeric"
              style={{ fontSize: 20, marginVertical: 12, height: 36 }}
            />
          </View>
          <View className="flex flex-col">
            <Text>Body fat(%)</Text>
            <TextInput
              placeholder="Body fat"
              onChangeText={(text) => {
                // 将逗号替换为点
                text = text.replace(",", ".");
                // 只允许数字和小数点，并且最多两位小数
                const regex = /^\d*\.?\d{0,2}$/;
                if (regex.test(text)) {
                  setBodyFat(text);
                }
              }}
              value={bodyFat.toString()}
              keyboardType="numeric"
              style={{ fontSize: 20, marginVertical: 12, height: 36 }}
            />
          </View>

          <View className=" items-center my-4">
            <Pressable
              onPress={saveBodyData}
              style={{
                width: 320,
                height: 48,
                borderRadius: 16,
                backgroundColor: "#FFC53D",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Text>Save Change</Text>
            </Pressable>
            <Pressable
              onPress={deleteBodyData}
              style={{
                width: 320,
                height: 48,
                borderRadius: 16,
                backgroundColor: "#FFC53D",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Text>Delete it</Text>
            </Pressable>
            <Pressable
              onPress={showBodyData}
              style={{
                width: 320,
                height: 48,
                borderRadius: 16,
                backgroundColor: "#FFC53D",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Text>Show Body Data</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
