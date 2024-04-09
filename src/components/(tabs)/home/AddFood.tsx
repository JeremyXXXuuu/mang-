import { TextInput, View, Text, Pressable, Image } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
const PlaceholderImage = require("@/assets/images/placeholder.png");

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

  return <Image width={320} height={320} source={imageSource} />;
}

export function Button({
  label,
  theme,
  onPress,
}: {
  label: string;
  theme?: string;
  onPress: () => void;
}) {
  return (
    <View>
      <Pressable onPress={onPress}>
        <Text>{label}</Text>
      </Pressable>
    </View>
  );
}

const AddFood = () => {
  const [image, setImage] = React.useState<string | undefined>(undefined);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      setImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };
  return (
    <View className="flex flex-col border-2 rounded-md border-black m-2 p-2">
      <Button label="choose a pic" onPress={pickImageAsync} />
      <ImageViewer
        placeholderImageSource={PlaceholderImage}
        selectedImage={image}
      />
      <TextInput placeholder="Enter name" />
      <TextInput placeholder="Enter Macros" />
      <TextInput placeholder="Enter time" />
      <Text>餐食分类</Text>
      <TextInput placeholder="Enter location" />
      <TextInput placeholder="Enter price" />
    </View>
  );
};

export default AddFood;
