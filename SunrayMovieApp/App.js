import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { Provider } from "react-redux";

import AppNavigator from "./src/navigation/AppNavigator";
import store from "./src/store/store";

export default function App() {
  let theme = useColorScheme();

  return (
    <Provider store={store}>
      <AppearanceProvider>
        <AppNavigator theme={theme} />
      </AppearanceProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
