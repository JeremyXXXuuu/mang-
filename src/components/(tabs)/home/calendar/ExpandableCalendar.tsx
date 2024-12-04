import React, { useRef, useCallback, useState, useEffect } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
} from "react-native-calendars";
import testIDs from "./test/testIDs";
import { agendaItems, getMarkedDates } from "./mocks/agendaItems";
import AgendaItem from "./mocks/AgendaItem";
import { getTheme, themeColor, lightThemeColor } from "./mocks/theme";
import { View, Text } from "@/src/components/Themed";

const leftArrowIcon = require("./previous.png");
const rightArrowIcon = require("./next.png");
const ITEMS: any[] = agendaItems;

import { MyList } from "../foodList";
import { Home } from "../Home";
import AddButton from "../../AddButton";

interface Props {
  weekView?: boolean;
}

const themes = {
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

export const ExpandableCalendarScreen = (props: Props) => {
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const colorTheme = useColorScheme() ?? "light";
  const [{ key, theme }, setTheme] = useState({
    key: colorTheme,
    theme: themes[colorTheme],
  });

  useEffect(() => {
    setTheme({ key: colorTheme, theme: themes[colorTheme] });
  }, [colorTheme]);

  const { weekView } = props;
  const marked = useRef(getMarkedDates());
  // const theme = useRef(getTheme());
  const todayBtnTheme = useRef({
    todayButtonTextColor: themeColor,
  });

  const onDateChanged = useCallback((date, updateSource) => {
    console.log("ExpandableCalendarScreen onDateChanged: ", date, updateSource);
    setDate(date);
  }, []);

  const renderItem = useCallback(({ item }: any) => {
    return <AgendaItem item={item} />;
  }, []);

  return (
    <CalendarProvider
      date={ITEMS[1]?.title}
      onDateChanged={onDateChanged}
      onMonthChange={(month) => console.log(month)}
      showTodayButton
      // disabledOpacity={0.6}
      theme={todayBtnTheme.current}
      // todayBottomMargin={16}
    >
      {weekView ? (
        <WeekCalendar
          testID={testIDs.weekCalendar.CONTAINER}
          firstDay={1}
          markedDates={marked.current}
        />
      ) : (
        <ExpandableCalendar
          hideKnob={true}
          // hideArrows={true}
          testID={testIDs.expandableCalendar.CONTAINER}
          // horizontal={false}
          // hideArrows
          // disablePan
          // hideKnob
          // initialPosition={ExpandableCalendar.positions.OPEN}
          // calendarStyle={styles.calendar}
          // headerStyle={styles.header} // for horizontal only
          // disableWeekScroll
          theme={theme}
          key={key}
          // disableAllTouchEventsForDisabledDays
          firstDay={1}
          markedDates={marked.current}
          leftArrowImageSource={leftArrowIcon}
          rightArrowImageSource={rightArrowIcon}
          // animateScroll
          // closeOnDayPress={false}
        />
      )}

      <View className="">
        {/* <MyList date={date} /> */}
        <Home date={date} />
      </View>
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    backgroundColor: "lightgrey",
  },
  section: {
    backgroundColor: lightThemeColor,
    color: "grey",
    textTransform: "capitalize",
  },
});
