import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/src/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";

import AddButton from "@/src/components/(tabs)/AddButton";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  function onPress() {
    console.log("press from tab layout");
  }

  function headerRight() {
    return (
      <Link href="/modal/food" asChild>
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
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home page",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight,
        }}
      />

      <Tabs.Screen
        name="body/index"
        options={{
          title: "body",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          // href: "/user",
          headerRight,
        }}
      />
      <Tabs.Screen
        name="food/index"
        options={{
          title: "Food",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight,
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: "body",
          // hide this tab from the tab bar
          href: null,
        }}
      />
    </Tabs>
  );
}
