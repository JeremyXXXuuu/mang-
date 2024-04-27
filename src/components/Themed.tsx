/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */
import { StyleSheet } from "react-native";

import {
  Text as DefaultText,
  View as DefaultView,
  TextInput as DefaultTextInput,
} from "react-native";
import { SegmentedControl as DefaultSegmentedControl } from "react-native-ui-lib";

import Colors from "@/src/constants/Colors";
import { useColorScheme } from "./useColorScheme";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type TextInputProps = ThemeProps & DefaultTextInput["props"];
export type SegmentedControlProps = ThemeProps & any;

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "TextInputBackground"
  );

  return (
    <DefaultTextInput
      style={[commonStyle.textInput, { color, backgroundColor }, style]}
      {...otherProps}
    />
  );
}

export function SegmentedControl(props: SegmentedControlProps) {
  //define backgroundColor, activeColor, activeBackgroundColor, based on light or dark mode
  const backgroundColor = useThemeColor(
    { light: props.lightColor, dark: props.darkColor },
    "background"
  );
  const activeColor = useThemeColor(
    { light: props.lightColor, dark: props.darkColor },
    "text"
  );
  const activeBackgroundColor = useThemeColor(
    { light: props.lightColor, dark: props.darkColor },
    "activeBackgroundColor"
  );

  return (
    <DefaultSegmentedControl
      backgroundColor={backgroundColor}
      activeColor={activeColor}
      activeBackgroundColor={activeBackgroundColor}
      {...props}
    />
  );
}

const commonStyle = StyleSheet.create({
  textInput: {
    borderRadius: 8,
    paddingHorizontal: 10,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16,
    padding: 6,
    fontWeight: "400",
  },
});
