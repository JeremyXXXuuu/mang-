import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
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
        name="index"
        options={{
          title: "Tab One",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      {/* create a modal screen after press the + button, diplay small card render above tab bar */}
      <Tabs.Screen
        name="home"
        options={{
          title: "+",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          tabBarButton: ({ onPress, accessibilityState }) => {
            return (
              <Pressable
                onPress={() => {
                  console.log("press");
                  console.log(onPress);
                  console.log(accessibilityState);
                }}
                style={({ pressed }) => ({
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: pressed
                    ? Colors[colorScheme ?? "light"].tint
                    : Colors[colorScheme ?? "light"].tabIconDefault,
                  justifyContent: "center",
                  alignItems: "center",
                  // position: "absolute",
                  bottom: 20,
                  zIndex: 100,
                })}
                accessibilityRole="button"
                accessibilityState={accessibilityState}
              >
                <FontAwesome
                  name="plus"
                  size={30}
                  color={Colors[colorScheme ?? "light"].tabIconSelected}
                />
              </Pressable>
            );
          },
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
