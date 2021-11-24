import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet, View, TextInput, Image, Button } from "react-native";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import CanvasGrid from "./CanvasGrid";
import { Background } from "@react-navigation/elements";

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {};

  render() {
    const { route, navigation } = this.props;
    const { newColor } = route.params == null ? "pink" : route.params;
    return (
      <View>
        <CanvasGrid currentColor={newColor}></CanvasGrid>
        <Button
          title="Pick Color"
          onPress={() => {
            this.props.navigation.navigate("ColorPicker");
          }}
        />
        <View
          style={{
            backgroundColor: newColor,
            width: 44,
            height: 44,
            borderRadius: 44 / 2
          }}
        ></View>
        <Text>color:{newColor}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    width: 44,
    height: 44,
    borderRadius: 44 / 2
  }
});
