import {
  TextInput,
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
const PlaceholderImage = require("@/assets/images/placeholder.png");
import * as SQLite from "expo-sqlite";
import DateTimePicker from "@react-native-community/datetimepicker";

const sampleFood = {
  id: "1",
  picture: "https://picsum.photos/200",
  name: "Burger",
  calories: 200,
  micros: JSON.stringify({
    C: 20,
    P: 10,
    F: 5,
  }),
  repas: "lunch",
  time: "12:00",
  price: "10EUR",
  location: "Home",
  user_id: "1",
};

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
      className="text-lg border-2 rounded-md border-black text-center p-2 m-2 bg-gray-200"
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

const AddFood = () => {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [food, setFood] = useState<any>(undefined);

  const [name, setName] = useState("");
  const [calories, setCalories] = useState<number>();
  const [macros, setMacros] = useState<Macros>();
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("");

  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const [db, setDb] = useState<SQLite.WebSQLDatabase>(
    SQLite.openDatabase("food.db")
  );

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS FOOD (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, calories INTEGER, macros TEXT, time TEXT, location TEXT, price TEXT, picture TEXT, user_id INTEGER, repas TEXT)",
        [],
        (_, { rows }) => {
          console.log(rows);
        },
        (_, error) => {
          console.log(error);
          return true;
        }
      );
      console.log("table created");
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM FOOD",
        [],
        (txObj, resultSet) => {
          console.log(resultSet.rows._array);
          setFood(resultSet.rows._array);
        },
        (txObj, error) => {
          setError(error.message);
          console.log(error);
          return true;
        }
      );
    });
    setIsLoading(false);
  }, [db]);

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

  const showFood = () => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM FOOD", [], (_, { rows }) => {
        setFood(rows._array);
        console.log(rows._array);
      });
    });
  };

  const savefood = () => {
    console.log("saving food");
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO FOOD (name, calories, macros, time, location, price, picture, user_id, repas) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          name,
          calories || 0,
          JSON.stringify(macros),
          time,
          location,
          price,
          image || "",
          1,
          "lunch",
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
  };
  const [dateTime, setDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateTime;
    setShowDatePicker(false);
    setDateTime(currentDate);
    setShowTimePicker(true); // show time picker after date is picked
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || dateTime;
    setShowTimePicker(false);
    setDateTime(currentTime);
  };

  return (
    <ScrollView className="flex flex-col gap-6 border-2 rounded-md border-black m-2 ">
      <Button label="choose a pic" onPress={pickImageAsync} />
      <ImageViewer
        placeholderImageSource={PlaceholderImage}
        selectedImage={image}
      />
      <TextInput
        placeholder="Enter name"
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <TextInput
        placeholder="Enter calories"
        onChangeText={(text) => setCalories(Number(text))}
        value={calories?.toString()}
      />
      <TextInput
        placeholder="fat"
        onChangeText={(text) => setMacros({ ...macros, F: Number(text) })}
        value={macros?.F?.toString()}
      />
      <TextInput
        placeholder="protein"
        onChangeText={(text) => setMacros({ ...macros, P: Number(text) })}
        value={macros?.P?.toString()}
      />
      <TextInput
        placeholder="carbs"
        onChangeText={(text) => setMacros({ ...macros, C: Number(text) })}
        value={macros?.C?.toString()}
      />
      <Button
        label="Show Date Picker"
        onPress={() => setShowDatePicker(true)}
      />
      {showDatePicker && (
        <DateTimePicker
          value={dateTime}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={dateTime}
          mode="time"
          display="default"
          onChange={onTimeChange}
        />
      )}
      <TextInput
        placeholder="Enter category"
        onChangeText={(text) => setCategory(text)}
        value={category}
      />
      <TextInput
        placeholder="Enter location"
        onChangeText={(text) => setLocation(text)}
        value={location}
      />
      <TextInput
        placeholder="Enter price"
        onChangeText={(text) => setPrice(text)}
        value={price}
      />

      <View className="flex flex-row mb-5">
        <Button className="m-3" label="save" onPress={savefood} />
        <Button className="m-3" label="show" onPress={showFood} />
      </View>
    </ScrollView>
  );
};

export default AddFood;
