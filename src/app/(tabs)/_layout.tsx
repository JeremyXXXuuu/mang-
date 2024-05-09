import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs, router } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/src/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  function headerRight() {
    return (
      <Link href="/modal/user" asChild>
        <Pressable>
          {({ pressed }) => (
            <FontAwesome
              name="user-o"
              size={20}
              color={Colors[colorScheme ?? "light"].text}
              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      </Link>
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Food Log",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="food-croissant"
              size={32}
              color={color}
            />
          ),
          headerRight,
          // headerShown: false,
        }}
      />

      <Tabs.Screen
        name="addButtonTab"
        options={{
          tabBarShowLabel: false,
          title: "12",
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          tabBarIcon: ({ color }) => (
            <FontAwesome
              name="plus"
              size={32}
              color={color}
              // color={
              //   focused
              //     ? config.colors.PrimaryColor
              //     : config.colors.SecondaryTextColor
              // }
            />
          ),
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            router.push("/modal/food/new"); // <-- Here you put the name where the chat component is declared
          },
        })}
      />
      <Tabs.Screen
        name="analytics/index"
        options={{
          title: "analytics",
          tabBarIcon: ({ color }) => (
            <Ionicons name="analytics" size={32} color={color} />
          ),
          headerRight,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
