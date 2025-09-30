import 'react-native-gesture-handler';
import 'react-native-reanimated';

import React from "react";
import { StatusBar } from "react-native";
import TodoScreen from "./src/features/todos/screens/TodoScreen";
import { useThemeStore } from "./src/features/todos/store/themeStore";
import { palettes } from "./src/theme/colors";

export default function App() {
  const { theme } = useThemeStore();
  const C = palettes[theme];
  return (
    <>
      <StatusBar barStyle={theme === "dark" ? "light-content" : "dark-content"} backgroundColor={C.bg} />
      <TodoScreen />
    </>
  );
}
