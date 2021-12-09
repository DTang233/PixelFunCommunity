import React, { Component } from "react";
import { StyleSheet } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Profile from "../screens/Profile";

import Ionicons from "react-native-vector-icons/Ionicons";
import { DeviceEventEmitter } from "react-native";
const Tab = createBottomTabNavigator();

export default class MyTabbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {};

  handleTabChange = active => {
    this.props.navigation.navigate(active);
  };
  componentDidMount() {
    DeviceEventEmitter.emit("testName");
  }
  render() {
    const { route, navigation } = this.props;

    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "Search") {
              iconName = focused ? "search" : "search-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray"
        })}
      >
        <Tab.Screen name="Home">
          {props => (
            <Home
              {...props}
              extraData={route.params === undefined ? 0 : route.params.uid}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Search"
          options={{
            title: "Search"
          }}
        >
          {props => (
            <Search
              {...props}
              userID={route.params === undefined ? 0 : route.params.uid}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Profile">
          {props => (
            <Profile
              {...props}
              userID={route.params === undefined ? 0 : route.params.uid}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  }
});
