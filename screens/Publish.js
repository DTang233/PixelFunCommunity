import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components/native";
import PixelArt from "../components/PixelArt";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import { Text, ActivityIndicator, KeyboardAvoidingView } from "react-native";

const Title = styled.Text`
  font-size: 20px;
  font-weight: 400;
`;

const Wrapper = styled.View`
  flex: 1;
  background-color: white;
`;

const TitleWrapper = styled.View`
  border-top-width: 1px;
  border-color: grey;
  padding-top: 25px;
  padding-bottom: 40px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const PublishButton = styled.TouchableOpacity`
  alignItems: center;
  backgroundColor: #DDDDDD;
  padding: 10px;
  margin: 30px 100px 20px 100px;
>`;

export default class Publish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      loading: false
    };
  }

  static defaultProps = {};

  render() {
    const { route, navigation } = this.props;
    const { backgroundColor, canvasData, onPublishPress } = route.params;
    return (
      <Wrapper>
        <PixelArt
          data={canvasData}
          backgroundColor={backgroundColor}
          size={Dimensions.get("window").width}
        />
        <TitleWrapper>
          <Icon
            name="pencil"
            style={{
              fontSize: 22,
              height: 22,
              paddingRight: 10,
              color: "tomato"
            }}
          ></Icon>

          <Title>Name Your Work</Title>
        </TitleWrapper>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={70}>
          <Input
            containerStyle={{ backgroundColor: "white", padding: 12 }}
            placeholder="Title..."
            onChangeText={value =>
              this.setState({
                title: value
              })
            }
          />
        </KeyboardAvoidingView>
        <PublishButton
          onPress={() => {
            this.setState({
              loading: true
            });
            onPublishPress(this.state.title);
          }}
        >
          {this.state.loading ? (
            <ActivityIndicator size="small" color="grey" />
          ) : (
            <Text>Publish</Text>
          )}
        </PublishButton>
      </Wrapper>
    );
  }
}

const styles = {};
