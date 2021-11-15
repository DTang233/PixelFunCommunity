import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import AssetExample from './components/AssetExample';
import Canvas from './components/Canvas';
import ColorPicker from './components/ColorPicker';
import { Card } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <View style={styles.container}>
      <Card></Card>
      <View style={styles.container}>
        <Text style={styles.paragraph}>Screen</Text>
        <NavigationContainer>
          <Stack.Navigator name="HomeComponent">
            <Stack.Screen
              name="Canvas"
              component={Canvas}
              options={{ title: 'canvas' }}
            />
            <Stack.Screen
              name="ColorPicker"
              component={ColorPicker}
              options={{ title: 'ColorPicker' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
