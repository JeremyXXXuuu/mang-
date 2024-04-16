import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.db");

import { useColorScheme } from "@/src/components/useColorScheme";

import config from "../../tamagui.config";
import { TamaguiProvider } from "@tamagui/core";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS FOOD (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, calories INTEGER, macros TEXT, time TEXT, location TEXT, price TEXT, picture TEXT, user_id INTEGER, repas TEXT)",
        [],
        (_, { rows }) => {
          console.log("layout", rows);
        },
        (_, error) => {
          console.log(error);
          return true;
        }
      );
      console.log("table created");
    });
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme as any}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal/user"
            options={{ presentation: "modal", headerShown: false }}
          />
          <Stack.Screen
            name="modal/food/[id]"
            options={{ presentation: "modal", headerShown: false }}
          />
          <Stack.Screen
            name="modal/body"
            options={{ presentation: "modal", headerShown: false }}
          />
        </Stack>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
