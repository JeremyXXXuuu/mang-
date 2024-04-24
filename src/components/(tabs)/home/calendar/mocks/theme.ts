import { Platform } from "react-native";

export const themeColor = "#C49B43";
export const lightThemeColor = "#f2f7f7";

export function getTheme() {
  const disabledColor = "grey";

  return {
    // arrows
    arrowColor: "black",
    arrowStyle: { padding: 0 },
    // knob
    expandableKnobColor: themeColor,
    // month
    monthTextColor: "black",
    textMonthFontSize: 16,
    // textMonthFontFamily: "HelveticaNeue",
    textMonthFontWeight: "bold" as const,
    // day names
    textSectionTitleColor: "black",
    textDayHeaderFontSize: 12,
    // textDayHeaderFontFamily: "HelveticaNeue",
    textDayHeaderFontWeight: "normal" as const,
    // dates
    dayTextColor: themeColor,
    todayTextColor: "#C29000",
    textDayFontSize: 18,
    // textDayFontFamily: "HelveticaNeue",
    textDayFontWeight: "500" as const,
    textDayStyle: { marginTop: Platform.OS === "android" ? 2 : 4 },
    // selected date
    selectedDayBackgroundColor: themeColor,
    selectedDayTextColor: "white",
    // disabled date
    textDisabledColor: disabledColor,
    // dot (marked date)
    dotColor: themeColor,
    selectedDotColor: "white",
    disabledDotColor: disabledColor,
    dotStyle: { marginTop: -2 },
    light: {
      calendarBackground: "white",
      dayTextColor: "black",
      monthTextColor: "black",
      textDisabledColor: "grey",
    },
    dark: {
      calendarBackground: "black",
      dayTextColor: "white",
      monthTextColor: "white",
      textDisabledColor: "grey",
    },
  };
}
