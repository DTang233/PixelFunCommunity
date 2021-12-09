import React, { Component } from "react";
import styled, { css } from "styled-components/native";
import { PIXEL_COUNT } from "../constants";

const Wrapper = styled.View`
  border-radius: ${({ rounded }) => (rounded ? 3 : 0)}px;
  background: ${({ background }) =>
    background == "none" ? "white" : background};
  overflow: hidden;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

const PixelsWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: ${({ pixelSize }) => pixelSize - 1}px;
`;

const PixelBlock = styled.View`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: ${({ color }) => color};
`;

const WarningText = styled.Text`
  text-align: center;
`;

export default class PixelArt extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {
    data: [],
    backgroundColor: "none",
    rounded: false
  };

  render() {
    const { data, backgroundColor, size, rounded, style } = this.props;
    const pixelSize = size / (PIXEL_COUNT + 2);
    return (
      <View>
        {data.length !== PIXEL_COUNT * PIXEL_COUNT || !backgroundColor ? (
          <Wrapper
            size={size}
            rounded={rounded}
            background={backgroundColor}
            style={[{ ...style }, { justifyContent: "center" }]}
          >
            <WarningText>Unable to load..</WarningText>
          </Wrapper>
        ) : (
          <Wrapper
            size={size}
            rounded={rounded}
            background={backgroundColor}
            style={{ ...style }}
          >
            <PixelsWrapper pixelSize={pixelSize}>
              {data.map((pixel, index) => (
                <PixelBlock
                  key={index}
                  size={pixelSize}
                  color={pixel.color !== "none" ? pixel.color : backgroundColor}
                />
              ))}
            </PixelsWrapper>
          </Wrapper>
        )}
      </View>
    );
  }
}
