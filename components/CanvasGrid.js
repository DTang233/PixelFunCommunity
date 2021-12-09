import React, { Component } from "react";
import {  StyleSheet, View, } from "react-native";

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
      backgroundColor: this.props.backgroundColor,
      currentColor: this.props.currentColor,
      selectedTool: this.props.selectedTool,
      displayGrid: this.props.displayGrid,
      data: this.props.data,
      updatedData: this.props.updatedData
    };
  }
  static defaultProps = {
    backgroundColor: "white",
    currentColor: "pink",
    selectedTool: "pencil",
    displayGrid: true,
    data: array
  };

  dropBucket = (data, dropIndex, color, initialColor, initialData) => {
    let newData = [...data];

    const topIndex = dropIndex - PIXEL_COUNT;
    const bottomIndex = dropIndex + PIXEL_COUNT;
    const leftIndex = dropIndex - 1;
    const rightIndex = dropIndex + 1;

    newData[dropIndex] = { color };

    if (
      topIndex >= 0 &&
      newData[topIndex].color === initialColor &&
      newData[topIndex].color !== color
    ) {
      newData = this.dropBucket(
        newData,
        topIndex,
        color,
        initialColor,
        initialData
      );
    }

    if (
      bottomIndex < PIXEL_COUNT * PIXEL_COUNT &&
      newData[bottomIndex].color === initialColor &&
      newData[bottomIndex].color !== color
    ) {
      newData = this.dropBucket(
        newData,
        bottomIndex,
        color,
        initialColor,
        initialData
      );
    }

    if (
      (leftIndex + 1) % PIXEL_COUNT !== 0 &&
      newData[leftIndex].color === initialColor
    ) {
      newData = this.dropBucket(
        newData,
        leftIndex,
        color,
        initialColor,
        initialData
      );
    }

    if (
      rightIndex % PIXEL_COUNT !== 0 &&
      newData[rightIndex].color === initialColor &&
      newData[rightIndex].color !== color
    ) {
      newData = this.dropBucket(
        newData,
        rightIndex,
        color,
        initialColor,
        initialData
      );
    }

    return newData;
  };

  updateCanvas = (evt, insets, headerHeight) => {
    if (evt.nativeEvent.pageX > EDITOR_BORDER_SIZE + PIXEL_SIZE * PIXEL_COUNT) {
      return;
    }
    const tx = evt.nativeEvent.pageX - EDITOR_BORDER_SIZE;

    const ty = evt.nativeEvent.pageY - EDITOR_BORDER_SIZE - HEADER_HEIGHT;
    const px = Math.trunc(tx / PIXEL_SIZE);
    const py = Math.trunc(ty / PIXEL_SIZE);
    const arrayPosition = py * PIXEL_COUNT + px;
    if (arrayPosition + 1 > this.props.data.length || arrayPosition < 0) {
      return;
    }
    if (
      this.props.data[arrayPosition].color ===
      (this.props.selectedTool === TOOLS.ERASER
        ? "none"
        : this.props.currentColor)
    ) {
      return;
    }
    let newData = this.props.data;
    if (this.props.selectedTool === TOOLS.BUCKET) {
      newData = this.dropBucket(
        newData,
        arrayPosition,
        this.props.currentColor,
        this.props.data[arrayPosition].color,
        newData
      );
    } else {
      newData[arrayPosition] = {
        color:
          this.props.selectedTool === TOOLS.PENCIL
            ? this.props.currentColor
            : "none"
      };
    }
    this.setState({
      data: newData
    });
    this.props.updatedData([...newData]);
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
          {this.props.data.map((pixel, index) => (
            <PixelBlock
              key={index}
              index={index}
              backgroundColor={this.state.backgroundColor}
              displayGrid={this.props.displayGrid}
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
        backgroundColor={props.backgroundColor}
        selectedTool={props.selectedTool}
        displayGrid={props.displayGrid}
        data={props.data}
        updatedData={props.updateData}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
