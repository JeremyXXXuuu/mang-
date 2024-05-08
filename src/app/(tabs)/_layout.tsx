import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs, router } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/src/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";

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
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "FOOD LOG",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight,
          // headerShown: false,
        }}
      />

      <Tabs.Screen
        name="body/index"
        options={{
          title: "body",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          href: null,
          headerRight,
        }}
      />

      <Tabs.Screen
        name="addButtonTab"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="plus"
              size={24}
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
        name="food/index"
        options={{
          title: "Food",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight,
        }}
      />
    </Tabs>
  );
}
