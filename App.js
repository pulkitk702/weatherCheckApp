import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BottomNavigation from "./src/navigation/bottomnavigattion/BottomNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import ReduxStore from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
export default function App() {
  const { Store, persistedStore } = ReduxStore();
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <NavigationContainer>
          <BottomNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
