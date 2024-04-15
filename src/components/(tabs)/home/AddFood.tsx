import {
  TextInput,
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
const PlaceholderImage = require("@/assets/images/placeholder.png");
import * as SQLite from "expo-sqlite";

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
  const [image, setImage] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [food, setFood] = useState<any>(undefined);

  const [name, setName] = useState("");
  const [calories, setCalories] = useState<number>();
  const [macros, setMacros] = useState("");
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
          macros,
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
        placeholder="Enter Macros"
        onChangeText={(text) => setMacros(text)}
        value={macros}
      />
      <TextInput
        placeholder="Enter time"
        onChangeText={(text) => setTime(text)}
        value={time}
      />
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
      <Button label="save food" onPress={savefood} />
      <Button label="show food" onPress={showFood} />
    </ScrollView>
  );
};

export default AddFood;
