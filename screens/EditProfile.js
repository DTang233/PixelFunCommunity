import React, { Component } from "react";
import styled, { css } from "styled-components/native";
import { AvatorPhotos } from "../constants";
import { FlatGrid } from "react-native-super-grid";
import { firebase } from "../firebase/config";

import {
  TextInput,
  Image,
  TouchableOpacity,
  Button,
  Alert
} from "react-native";

const Avatar = styled.View`
  padding: 40px 20px 30px 20px;
  background: white;
  justify-content: center;
  align-items: center;
  justify-content: space-around;
`;
const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: white;
  align-items: center;
`;
const EditButton = styled.TouchableOpacity`
  background: white;
  justify-content: center;
  padding: 5px;
  align-items: center;
  border-width: 1px;
  border-color: gray;
  margin: 0px 10px 0px 10px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 5px 0 30px 0;
  align-items: center;
  background-color: white;
`;

const RowText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  margin-right: 30px;
`;

const usersRef = firebase.firestore().collection("users");
export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.route === undefined ? "" : this.props.route.params.name,
      url: this.props.route === undefined ? "" : this.props.route.params.url,
      userID: this.props.route === undefined ? "" : this.props.route.params.uid
    };
  }

  static defaultProps = {};

  onSubmit = () => {
    usersRef.doc(this.state.userID).update({
      fullName: this.state.name,
      url: this.state.url
    });
    Alert.alert("Sucess", "Save!", () => this.props.navigation.goBack());
  };

  renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={{ borderColor: "grey", borderWidth: 1 }}
      onPress={() => {
        this.setState({
          url: item
        });
      }}
    >
      <Image
        source={{
          uri: item
        }}
        style={{
          width: 120,
          height: 120
        }}
      />
    </TouchableOpacity>
  );

  render() {
    const { route, navigation } = this.props;
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => this.onSubmit()}
          title="Save   "
          color="tomato"
        />
      )
    });

    return (
      <Wrapper>
        <Avatar>
          <Image
            source={{
              uri: this.state.url
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50
            }}
          />
        </Avatar>
        <Row>
          <RowText>Name</RowText>
          <TextInput
            defaultValue={this.state.name}
            style={{
              height: 40,
              width: 200,
              borderColor: "gray",
              borderBottomWidth: 1
            }}
            onChangeText={text => this.setState({ name: text })}
          />
        </Row>
        <FlatGrid
          data={AvatorPhotos}
          style={styles.gridView}
          spacing={10}
          renderItem={this.renderItem}
        />
      </Wrapper>
    );
  }
}

const styles = {
  container: {
    alignItems: "center"
  },
  inputContainer: {
    height: 30,
    backgroundColor: "#EFEFEF"
  },
  input: {
    fontSize: 16
  },
  gridView: {
    marginTop: 10,
    flex: 1
  }
};
