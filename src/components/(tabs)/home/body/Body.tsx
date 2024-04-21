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
} from "react-native";
import { TextInput, Text, View } from "@/src/components/Themed";
import React, { useCallback, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
const PlaceholderImage = require("@/assets/images/placeholderbody.png");
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import SelectRepasModal from "@/src/components/modals/food/SelectRepas";
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

const backToHome = () => {
  router.dismissAll();
  setTimeout(() => {
    router.push("/(tabs)/home");
  }, 0);
};

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

  const [name, setName] = useState("");

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

  const showFood = () => {
    db.queryAllFood().catch((error) => {
      console.log(error);
    });
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
      behavior="padding"
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
          <Pressable onPress={pickImageAsync}>
            <ImageViewer
              placeholderImageSource={PlaceholderImage}
              selectedImage={image}
            />
          </Pressable>

          <View className="flex flex-col">
            <Text>Height(cm)</Text>
            <TextInput
              placeholder="Height"
              onChangeText={(text) => setName(text)}
              value={name}
              style={{ fontSize: 20, marginVertical: 12, height: 36 }}
            />
          </View>
          <View className="flex flex-col">
            <Text>Weight(kg)</Text>
            <TextInput
              placeholder="Weight"
              onChangeText={(text) => setName(text)}
              value={name}
              style={{ fontSize: 20, marginVertical: 12, height: 36 }}
            />
          </View>
          <View className="flex flex-col">
            <Text>Body fat(%)</Text>
            <TextInput
              placeholder="Body fat"
              onChangeText={(text) => setName(text)}
              value={name}
              style={{ fontSize: 20, marginVertical: 12, height: 36 }}
            />
          </View>

          <View className=" items-center my-4">
            <Pressable
              onPress={() => console.log("delete")}
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
              onPress={() => console.log("delete")}
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
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
