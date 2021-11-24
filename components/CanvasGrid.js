import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet, View, TextInput, Image, Button } from "react-native";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import { PanResponder } from "react-native";
import styled, { css } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";

import {
  EDITOR_BORDER_SIZE,
  HEADER_HEIGHT,
  PIXEL_COUNT,
  PIXEL_SIZE,
  TOOLS
} from "../constants";

let array = [];
for (let i = 0; i < PIXEL_COUNT; i++) {
  for (let j = 0; j < PIXEL_COUNT; j++) {
    array.push({ color: "white" });
  }
}

const Wrapper = styled.View`
  width: 100%;
  padding: ${EDITOR_BORDER_SIZE}px;
`;

const Grid = styled.View`
  width: 100%;
  height: ${PIXEL_SIZE * PIXEL_COUNT}px;
  background: white;
  flex-direction: row;
  flex-wrap: wrap;
`;

const PixelBlock = styled.View`
  background: ${props =>
    props.color === "none" ? props.backgroundColor : props.color};
  height: ${PIXEL_SIZE}px;
  width: ${PIXEL_SIZE}px;
  ${({ displayGrid, index }) =>
    displayGrid &&
    `
    border-bottom-width: 1px;
    border-left-width: 1px;
    border-right-width: ${index % PIXEL_COUNT === 15 ? 1 : 0}px;
    border-top-width: ${index < PIXEL_COUNT ? 1 : 0}px;
  `}
`;

class CanvasGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "white",
      currentColor: this.props.currentColor,
      selectedTool: "pencil",
      displayGrid: true,
      data: array
    };
  }
  static defaultProps = {
    backgroundColor: "white",
    currentColor: "pink",
    selectedTool: "pencil",
    displayGrid: true,
    data: array
  };

  updateCanvas = (evt, insets, headerHeight) => {
    if (evt.nativeEvent.pageX > EDITOR_BORDER_SIZE + PIXEL_SIZE * PIXEL_COUNT) {
      return;
    }
    const tx = evt.nativeEvent.pageX - EDITOR_BORDER_SIZE;
    // const ty =
    //   evt.nativeEvent.pageY - EDITOR_BORDER_SIZE - HEADER_HEIGHT - insets.top;
    const ty = evt.nativeEvent.pageY - EDITOR_BORDER_SIZE - headerHeight;
    const px = Math.trunc(tx / PIXEL_SIZE);
    const py = Math.trunc(ty / PIXEL_SIZE);
    const arrayPosition = py * PIXEL_COUNT + px;
    if (arrayPosition + 1 > this.state.data.length || arrayPosition < 0) {
      return;
    }
    if (
      this.state.data[arrayPosition].color ===
      (this.state.selectedTool === TOOLS.ERASER
        ? "none"
        : this.props.currentColor)
    ) {
      return;
    }
    let newData = this.state.data;
    if (this.state.selectedTool === TOOLS.BUCKET) {
      // newData = dropBucket(
      //   newData,
      //   arrayPosition,
      //   currentColor,
      //   data[arrayPosition].color,
      //   newData
      // );
    } else {
      newData[arrayPosition] = {
        color:
          this.state.selectedTool === TOOLS.PENCIL
            ? this.props.currentColor
            : "none"
      };
    }
    this.setState({
      data: newData
    });
  };

  render() {
    const { route, navigation } = this.props;
    const { insets, headerHeight } = this.props;
    return (
      <Wrapper backgroundColor={this.props.backgroundColor}>
        <Grid
          onStartShouldSetResponder={() => true}
          onStartShouldSetResponderCapture={() => true}
          onMoveShouldSetResponder={() => true}
          onMoveShouldSetResponderCapture={() => true}
          onResponderGrant={evt => this.updateCanvas(evt, insets, headerHeight)}
          onResponderMove={evt => {
            this.updateCanvas(evt, insets, headerHeight);
          }}
          onResponderTerminationRequest={() => true}
          onShouldBlockNativeResponder={() => true}
        >
          {this.state.data.map((pixel, index) => (
            <PixelBlock
              key={index}
              index={index}
              backgroundColor={this.state.backgroundColor}
              displayGrid={this.state.displayGrid}
              color={pixel.color}
              style={{ borderColor: "#E5E5E5" }}
            />
          ))}
        </Grid>
      </Wrapper>
    );
  }
}

export default function(props) {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  return (
    <View>
      <CanvasGrid
        {...props}
        insets={insets}
        headerHeight={headerHeight}
        currentColor={props.currentColor}
      />
      <Text>aaa{props.currentColor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
