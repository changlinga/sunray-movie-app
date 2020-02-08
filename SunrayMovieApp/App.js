import React from "react";
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
