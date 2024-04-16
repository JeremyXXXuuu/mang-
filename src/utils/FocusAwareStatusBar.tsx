import React, { useEffect } from "react";
import { StatusBar, StatusBarProps } from "expo-status-bar";
import { useNavigation, usePathname } from "expo-router";

const FocusAwareStatusBar = (props: StatusBarProps) => {
  useEffect(() => {}, []);
  const navigation = useNavigation();
  const focused = navigation.isFocused();
  const path = usePathname();

  useEffect(() => {
    console.log(
      `Current page is focused: ${focused}, current page name: ${path}`
    );
  }, [focused]);

  if (!focused) return null;
  return <StatusBar {...props} />;
};

export default React.memo(FocusAwareStatusBar);
