import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components/native";

import { firebase } from "../firebase/config";
import { FlatGrid } from "react-native-super-grid";
import PixelArt from "../components/PixelArt";

import { View, TouchableOpacity } from "react-native";
import { Background } from "@react-navigation/elements";

const Input = styled.TextInput`
  padding: 13px 50px 13px 15px;
  border-radius: 5px;
  border: 1px solid grey;
  margin-bottom: 20px;
`;

const Photos = [];
for (let i = 0; i < 10; i++) {
  Photos.push({
    url: "https://picsum.photos/id/125/250/250"
  });
}
const imagesRef = firebase.firestore().collection("images");
var newEntities = [];
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      index: null,
      userID: this.props.userID,
      data: Photos,
      allData: Photos,
      result: [],
      newComment: ""
    };
  }

  static defaultProps = {};

  onSubmit(e) {
    if (e.nativeEvent.text === " ") {
      this.setState({
        data: this.state.allData
      });
    }
    newEntities = [];
    this.state.data.forEach(d => {
      if (d.title.indexOf(e.nativeEvent.text) != -1) {
        imagesRef
          .where("title", "==", d.title)
          .orderBy("publishTime")
          .onSnapshot(
            querySnapshot => {
              querySnapshot.forEach(doc => {
                const entity = doc.data();
                entity.id = doc.id;
                newEntities.push(entity);
                this.setState({
                  data: newEntities
                });
              });
            },
            error => {}
          );
      }
    });
    this.setState({ newComment: e.nativeEvent.text });
  }

  viewDetail = item => {
    this.props.navigation.navigate("Detail", item);
  };

  componentDidMount() {
    imagesRef.orderBy("publishTime").onSnapshot(
      querySnapshot => {
        const newEntities = [];
        querySnapshot.forEach(doc => {
          const entity = doc.data();
          entity.id = doc.id;
          newEntities.push(entity);
        });
        this.setState({
          data: newEntities,
          allData: newEntities
        });
      },
      error => {}
    );
  }
  onChangeLike = () => {};
  viewDetail = (item, islike) => {
    this.props.navigation.navigate("Detail", {
      itemId: item.id,
      item: item,
      commentsCount: item.comments,
      uid: this.props.extraData,
      islike: islike,
      likesCount: item.likes,
      onChangeLike: this.onChangeLike
    });
  };

  renderItem = ({ index, item }) => (
    <TouchableOpacity
      onPress={() => {
        this.viewDetail(item, false);
      }}
    >
      <PixelArt
        data={item.canvasData}
        backgroundColor={item.backGroundColor}
        size={180}
      />
    </TouchableOpacity>
  );

  render() {
    const { search } = this.state;
    return (
      <View>
        <Input
          value={this.state.newComment}
          editable={true}
          onChange={e =>
            this.setState({
              newComment: e.nativeEvent.text
            })
          }
          placeholder="Search the key word of the title..."
          returnKeyType="send"
          placeholderTextColor="grey"
          multiline={true}
          maxLength={300}
          blurOnSubmit={true}
          enablesReturnKeyAutomatically={true}
          onSubmitEditing={e => this.onSubmit(e)}
        />
        <FlatGrid
          spacing={20}
          data={this.state.data}
          style={styles.gridView}
          renderItem={this.renderItem}
        />
      </View>
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
  }
};
