import * as React from "react";
import { Text, View, StyleSheet, Button, LogBox } from "react-native";
import Canvas from "./screens/Canvas";
import ColorPicker from "./screens/ColorPicker";

import Tabbar from "./components/Tabbar";
import Detail from "./screens/Detail";
import EditProfile from "./screens/EditProfile";
import Publish from "./screens/Publish";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { TransitionPresets } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { useEffect, useState } from "react";

import { firebase } from "./firebase/config";

import { LoginScreen, HomeScreen, RegistrationScreen } from "./screens";
import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}
LogBox.ignoreAllLogs();
export default function App() {
  const Stack = createStackNavigator();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then(document => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch(error => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <>
        <Text>No User!!!</Text>
      </>
    );
  }

  return (
    <SafeAreaProvider>
      {/* <Canvas /> */}
      <View style={styles.container}>
        <View style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator>
              {user ? (
                <>
                  <Stack.Group>
                    <Stack.Screen
                      name="HomeTab"
                      component={Tabbar}
                      options={{
                        headerShown: false,
                        ...TransitionPresets.SlideFromRightIOS
                      }}
                    />
                    <Stack.Screen
                      name="Canvas"
                      component={Canvas}
                      options={{
                        title: "Canvas",
                        headerShown: false,
                        ...TransitionPresets.ModalSlideFromBottomIOS
                      }}
                    />

                    <Stack.Screen
                      name="Publish"
                      component={Publish}
                      options={{
                        title: "Publish"
                      }}
                    />
                  </Stack.Group>
                  <Stack.Group>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen
                      name="Registration"
                      component={RegistrationScreen}
                    />
                  </Stack.Group>
                  <Stack.Group screenOptions={{ presentation: "modal" }}>
                    <Stack.Screen
                      name="ColorPicker"
                      component={ColorPicker}
                      options={{ title: "ColorPicker" }}
                    />
                    <Stack.Screen
                      name="Detail"
                      component={Detail}
                      options={{ title: "Detail" }}
                    />
                    <Stack.Screen
                      name="EditProfile"
                      component={EditProfile}
                      options={({ navigation, route }) => ({
                        headerTitle: "Edit Profile"
                      })}
                    />
                  </Stack.Group>
                </>
              ) : (
                <>
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen
                    name="Registration"
                    component={RegistrationScreen}
                  />
                </>
              )}
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
