import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components/native";

import { getDate } from "../util";
import CommentIcon from "../assets/comment";
import PixelArt from "../components/PixelArt";
import Icon from "react-native-vector-icons/Ionicons";
import Comment from "../components/Comment";
import { firebase } from "../firebase/config";

import {
  Image,
  Dimensions,
  ScrollView,
  Pressable,
  KeyboardAvoidingView
} from "react-native";

const InputWrapper = styled.View`
  padding: 15px;
  padding-bottom: ${({ insetBottom }) => insetBottom}px;
  position: relative;
  background-color: white;
`;
const Input = styled.TextInput`
  padding: 13px 50px 13px 15px;
  border-radius: 5px;
  border: 1px solid grey;
  margin-bottom: 20px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 4px 0 2px 0;
  flex: 1;
  padding: 5px 15px 5px 15px;
`;

const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: white;
`;

const TopRow = styled.View`
  flex-direction: row;
  margin: 6px 0 6px 0;
  align-items: center;
  justify-content: flex-start;
`;
const IconLabel = styled.Text`
  font-size: 14px;
  margin-left: 5px;
  font-weight: 500;
  margin-right: 10px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 400;
`;
const UserName = styled.Text`
  margin-left: 10px;
  font-size: 14px;
  font-weight: 500;
`;

const TimeLabel = styled.Text`
  font-size: 13px;
  font-weight: 400;
  color: #8a8a8a;
`;
const InfosText = styled.Text`
  font-weight: 500;
  font-size: 16px;
  margin: 15px 15px;
  color: grey;
`;

const commentsRef = firebase.firestore().collection("comments");
const imagesRef = firebase.firestore().collection("images");
const usersRef = firebase.firestore().collection("users");
export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      newComment: "",
      likesCount:
        this.props.route.params.likesCount === undefined
          ? 0
          : this.props.route.params.likesCount,
      islike: this.props.route.params.islike,
      userID:
        this.props.route.params.uid === undefined
          ? 0
          : this.props.route.params.uid,
      itemId:
        this.props.route.params.itemId === undefined
          ? 0
          : this.props.route.params.itemId,
      item:
        this.props.route.params.item === undefined
          ? null
          : this.props.route.params.item,
      commentsCount:
        this.props.route.params.commentsCount === undefined
          ? 0
          : this.props.route.params.commentsCount,
      userName: null,
      commentsContent: [],
      publishTime:
        !this.props.route.params.publishTime == null &&
        !this.props.route.params.publishTime === undefined
          ? this.props.route.params.publishTime.toDate()
          : new Date(),
      url:
        "https://firebasestorage.googleapis.com/v0/b/pixelfun-8f53a.appspot.com/o/6.jpeg?alt=media&token=d1764fdc-ff38-4413-92f5-ab22c2fb75c4",
      userNameComment: "Vistor"
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  static defaultProps = {};

  onSubmit = e => {
    this.setState({
      newComment: ""
    });
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
      itemId: this.state.itemId,
      userID: this.state.userID,
      userName: this.state.userNameComment,
      commentTime: timestamp,
      text: e.nativeEvent.text
    };
    commentsRef.add(data).then(
      imagesRef.doc(this.state.itemId).update({
        comments: this.state.commentsContent.length + 1
      })
    );

    this.setState({
      loading: false
    });
  };

  componentDidMount() {
    usersRef.where("id", "==", this.state.item.userID).onSnapshot(
      querySnapshot => {
        querySnapshot.forEach(doc => {
          this.setState({ userName: doc.data().fullName, url: doc.data().url });
        });
      },
      error => {}
    );
    usersRef.where("id", "==", this.state.userID).onSnapshot(
      querySnapshot => {
        querySnapshot.forEach(doc => {
          this.setState({
            userNameComment: doc.data().fullName
          });
        });
      },
      error => {}
    );
    if (this.state.itemId !== 0 && this.state.commentsContent.length === 0) {
      commentsRef
        .where("itemId", "==", this.state.itemId)
        .orderBy("commentTime", "desc")
        .onSnapshot(
          querySnapshot => {
            const newEntities = [];
            querySnapshot.forEach(doc => {
              const entity = doc.data();
              entity.id = doc.id;
              newEntities.push(entity);
            });
            this.setState({
              commentsContent: newEntities
            });
          },
          error => {}
        );
    }
  }

  pressLike = () => {
    this.setState({
      islike: !this.state.islike,
      likesCount: this.state.islike
        ? this.state.likesCount - 1
        : this.state.likesCount + 1
    });
    if (this.state.islike !== true) {
      imagesRef.doc(this.state.itemId).update({
        likes: this.state.likesCount + 1
      });
    }
    this.props.route.params.onChangeLike(
      this.props.route.params.item,
      this.state.islike,
      this.state.likesCount
    );
  };

  render() {
    const { item } = this.props.route.params;
    return (
      <Wrapper>
        <ScrollView>
          <Row
            style={{
              borderColor: "#EBEBEB",
              borderBottomWidth: 1,
              paddingBottom: 10
            }}
          >
            <Image
              source={{
                uri: this.state.url
              }}
              style={{
                width: 34,
                height: 34,
                borderRadius: 17
              }}
            />
            <UserName>{this.state.userName}</UserName>
          </Row>
          <PixelArt
            data={item.canvasData}
            backgroundColor={item.backGroundColor}
            size={Dimensions.get("window").width}
          />
          <Row>
            <Title>{item.title}</Title>
          </Row>
          <Row
            style={{
              borderColor: "#EBEBEB",
              borderBottomWidth: 1,
              paddingBottom: 16
            }}
          >
            <TimeLabel>{getDate(this.state.publishTime)}</TimeLabel>
          </Row>
          <Row>
            <Pressable onPress={e => this.pressLike()}>
              {this.state.islike ? (
                <Icon name="heart" size={25} color="tomato" />
              ) : (
                <Icon name="heart-outline" size={25} />
              )}
            </Pressable>
            <IconLabel>{this.state.likesCount}</IconLabel>
            <CommentIcon width={25} height={25} />
            <IconLabel>{this.state.commentsContent.length}</IconLabel>
          </Row>
          {this.state.commentsContent.length === 0 ? (
            <Row>
              <InfosText>🍻 Come on and be the first one to comment!</InfosText>
            </Row>
          ) : (
            this.state.commentsContent.map((item, i) => (
              <Comment
                key={new Date() + i}
                text={item.text}
                id={this.state.itemId}
                user={item.userName}
                time={item.commentTime}
                userId={item.userID}
              />
            ))
          )}
        </ScrollView>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={70}>
          <InputWrapper insetBottom={30}>
            {this.state.loading ? (
              <ActivityIndicator size="small" color="grey" />
            ) : (
              <Input
                value={this.state.newComment}
                editable={true}
                onChange={e =>
                  this.setState({
                    newComment: e.nativeEvent.text
                  })
                }
                placeholder={
                  this.state.commentsContent.length === 0
                    ? "Add the first comment..."
                    : "Add your comment..."
                }
                returnKeyType="send"
                placeholderTextColor="grey"
                multiline={true}
                maxLength={300}
                blurOnSubmit={true}
                enablesReturnKeyAutomatically={true}
                onSubmitEditing={e => {
                  this.setState({
                    loading: true
                  });
                  this.onSubmit(e);
                }}
              />
            )}
          </InputWrapper>
        </KeyboardAvoidingView>
      </Wrapper>
    );
  }
}
