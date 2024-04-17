import {
  TextInput as DefaultTextInput,
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { TextInput } from "@/src/components/Themed";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
const PlaceholderImage = require("@/assets/images/placeholderImage.png");
import * as SQLite from "expo-sqlite";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { router } from "expo-router";

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
      style={{ width: 320, height: 320 }}
      className="border-2 rounded-lg"
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

type Macros = {
  C?: number;
  P?: number;
  F?: number;
};

const Food = ({ id }: { id: string }) => {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [food, setFood] = useState<any>(undefined);

  const [name, setName] = useState("");
  const [calories, setCalories] = useState<number>(0);
  const [macros, setMacros] = useState<Macros>();
  const [repas, setRepas] = useState("");

  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const [db, setDb] = useState<SQLite.WebSQLDatabase>(
    SQLite.openDatabase("db.db")
  );

  useEffect(() => {
    if (id !== "new" && db) {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM FOOD WHERE id = ?",
          [id],
          (_, { rows }) => {
            if (rows.length > 0) {
              const food = rows.item(0);
              console.log(food);
              setImage(food.picture);
              setName(food.name);
              setCalories(food.calories);
              setMacros(JSON.parse(food.macros));
              setDateTime(new Date(food.time));
              setRepas(food.repas);
              setLocation(food.location);
              setPrice(food.price);
            }
          }
        );
      });
    }
  }, [db]);

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
    console.log("showing food");
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM FOOD",
        [],
        (_, { rows }) => {
          setFood(rows._array);
          console.log(rows._array);
        },
        (_, error) => {
          console.log(error);
          return true;
        }
      );
    });
  };

  const savefood = () => {
    if (!calories) {
      setCalories(macros?.F! * 9 + macros?.P! * 4 + macros?.C! * 4);
    }
    //make sure name is not empty, if yes alert the user
    if (!name) {
      alert("please enter name");
      return;
    }

    if (id !== "new" && db) {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE FOOD SET name = ?, calories = ?, macros = ?, time = ?, location = ?, price = ?, picture = ?, repas = ? WHERE id = ?",
          [
            name,
            calories || macros?.F! * 9 + macros?.P! * 4 + macros?.C! * 4,
            JSON.stringify(macros),
            dateTime.toISOString(),
            location,
            price,
            image?.toString() || "",
            repas,
            id,
          ],
          (_, { rows }) => {
            console.log(rows);
          },
          (_, error) => {
            console.log(error);
            return true;
          }
        );
      });
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO FOOD (name, calories, macros, time, location, price, picture, user_id, repas) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            name,
            calories || 0,
            JSON.stringify(macros),
            dateTime.toISOString(),
            location,
            price,
            image?.toString() || "",
            1,
            repas,
          ],
          (_, { rows }) => {
            console.log(rows);
          },
          (_, error) => {
            console.log(error);
            return true;
          }
        );
      });
    }
    //https://github.com/expo/expo/issues/26922#issuecomment-1996862878
    router.dismissAll();
    setTimeout(() => {
      router.push("/(tabs)/home");
    }, 0);
  };
  const [dateTime, setDateTime] = useState(new Date());
  const [mode, setMode] = useState<any>("date");
  const [show, setShow] = useState(false);
  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate;
    setShow(false);
    setDateTime(currentDate!);
  };

  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const clearDB = () => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM FOOD", [], (_, { rows }) => {
        console.log(rows);
      });
    });
  };

  const deleteDB = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM FOOD WHERE id = ?",
        [id],
        (_, { rows }) => {
          console.log(rows);
        },
        (_, error) => {
          console.log(error);
          return true;
        }
      );
    });
    router.dismissAll();
    setTimeout(() => {
      router.push("/(tabs)/home");
    }, 0);
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
    >
      <ScrollView
        className="flex flex-col gap-3 p-2 m-2"
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <Pressable onPress={pickImageAsync}>
          <ImageViewer
            placeholderImageSource={PlaceholderImage}
            selectedImage={image}
          />
        </Pressable>
        <TextInput
          placeholder="Enter name"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <View className="flex flex-row justify-evenly items-center p-2">
          <View>
            <Text>Calories</Text>
            <TextInput
              placeholder="Enter calories"
              onChangeText={(text) => setCalories(Number(text))}
              value={calories?.toString()}
              keyboardType="numeric"
            />
          </View>

          <View>
            <Text>Fat(g)</Text>
            <TextInput
              placeholder="fat"
              onChangeText={(text) => setMacros({ ...macros, F: Number(text) })}
              value={macros?.F?.toString()}
              keyboardType="numeric"
            />
          </View>

          <View>
            <Text>Protein(g)</Text>
            <TextInput
              placeholder="protein"
              onChangeText={(text) => setMacros({ ...macros, P: Number(text) })}
              value={macros?.P?.toString()}
              keyboardType="numeric"
            />
          </View>
          <View>
            <Text>Carbs(g)</Text>
            <TextInput
              placeholder="carbs"
              onChangeText={(text) => setMacros({ ...macros, C: Number(text) })}
              value={macros?.C?.toString()}
              keyboardType="numeric"
            />
          </View>
        </View>
        {/* show date time picker directly in ios,  */}
        {Platform.OS === "ios" ? (
          <SafeAreaView className="flex flex-row">
            <Text className="text-lg align-middle">Eating time: </Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={dateTime}
              mode="datetime"
              onChange={onChange}
            />
          </SafeAreaView>
        ) : (
          <View className="flex flex-col gap-2">
            <Button
              label={dateTime.toLocaleDateString()}
              onPress={showDatepicker}
            />
            <Button
              label={dateTime.toLocaleTimeString()}
              onPress={showTimepicker}
            />
          </View>
        )}

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateTime}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
        <TextInput
          placeholder="Enter repas"
          onChangeText={(text) => setRepas(text)}
          value={repas}
        />
        <TextInput
          placeholder="Enter location"
          onChangeText={(text) => setLocation(text)}
          value={location}
        />

        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 18,

              color: "#202020",
              textAlign: "center",
              textAlignVertical: "center",
              marginTop: 5,
            }}
          >
            Price €{" "}
          </Text>
          <TextInput
            placeholder="Enter price"
            onChangeText={(text) => setPrice(text)}
            value={price}
            keyboardType="numeric"
          />
        </View>

        <View className="flex flex-row mb-5">
          <Button className="m-3" label="save" onPress={savefood} />
          <Button className="m-3" label="show" onPress={showFood} />
          <Button className="m-3" label="clear" onPress={clearDB} />
          <Button className="m-3" label="delete" onPress={deleteDB} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Food;
