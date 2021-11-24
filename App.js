import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";

import Canvas from "./components/Canvas";
import ColorPicker from "./components/ColorPicker";
import { Card } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <SafeAreaProvider>
      {/* <Canvas /> */}
      <View style={styles.container}>
        <Card></Card>
        <View style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator name="HomeComponent">
              <Stack.Screen
                name="Canvas"
                component={Canvas}
                options={{ title: "canvas" }}
              />
              <Stack.Screen
                name="ColorPicker"
                component={ColorPicker}
                options={{ title: "ColorPicker" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  }
});
