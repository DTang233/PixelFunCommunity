import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import styled, { css } from "styled-components/native";
import { FlatGrid } from "react-native-super-grid";
import { firebase } from "../firebase/config";
import PixelArt from "../components/PixelArt";
import MoreIcon from "../assets/more";
import CatIcon from "../assets/icons/cat";
import PawIcon from "../assets/icons/paw";

const HeaderWrapper = styled.View`
  padding: 15px 5px 0px 5px;
  background: white;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
`;

const Col = styled.View`
  align-items: flex-start;
  margin-right: 20px;
  justify-content: flex-start;
  flex: 1;
  height: 160px;
  flex-direction: row;
`;

const Avatar = styled.View`
  padding: 20px 20px 20px 20px;
  background: white;
  justify-content: center;
  align-items: center;
  justify-content: space-around;
  flex: 5;
`;

const UserName = styled.Text`
  font-size: 14px;
  font-weight: 600;
  padding-top: 10px;
`;
const EditProfile = styled.Text`
  font-size: 15px;
  font-weight: 400;
`;
const EditButton = styled.TouchableOpacity`
  background: white;
  justify-content: center;
  padding: 5px;
  align-items: center;
  border-width: 1px;
  border-color: gray;
  margin: 0px 10px 10px 10px;
`;

const NumberWrapper = styled.View`
  background: white;
  justify-content: center;
  align-items: center;
  justify-content: space-around;
  flex: 5;
`;

const Number = styled.Text`
  font-size: 20px;
  font-weight: 500;
`;

const Tag = styled.Text`
  font-size: 12px;
  font-weight: 500;
`;

const InfosWrapper = styled.View`
  flex: 1;
  background: white;
  justify-content: flex-start;
`;

const ButtonsRow = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  background: white;
  padding-bottom: 10px;
`;
const IconButton = styled.TouchableOpacity`
  flex-direction: row;
  height: 30px;
  border-bottom-width: ${({ active }) => (active ? "1px" : "0px")};
  width: 180px;
  margin: 0px 10px;
  align-items: center;
  justify-content: center;
`;

const SignBox = styled.View`
  align-items: center;
  margin: 30px;
  justify-content: center;
  flex-direction: column;
`;

const EmptySign = styled.View`
  margin: 28px;
`;
const InfosText = styled.Text`
  font-weight: 500;
  font-size: 17px;
  margin: 15px 15px;
  color: grey;
`;

const examples = [];

const imagesRef = firebase.firestore().collection("images");
const draftsRef = firebase.firestore().collection("drafts");
const usersRef = firebase.firestore().collection("users");

const publishImages1 = [];
const draftImages1 = [];

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoUrl:
        "https://firebasestorage.googleapis.com/v0/b/pixelfun-8f53a.appspot.com/o/6.jpeg?alt=media&token=d1764fdc-ff38-4413-92f5-ab22c2fb75c4",
      userID: this.props.userID,
      showDrafts: false,
      published: examples,
      drafts: examples,
      userName: null,
      postsNum: null,
      likesNum: null,
      draftsNum: null
    };
  }

  static defaultProps = {};

  deletePhoto = item => {
    imagesRef.doc(item.id).delete();
  };

  deleteDraft = item => {
    draftsRef.doc(item.id).delete();
  };

  onLogout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate("Login");
      })
      .catch(error => {});
  }

  componentDidMount() {
    imagesRef
      .where("userID", "==", this.props.userID)
      .orderBy("publishTime", "desc")
      .onSnapshot(
        querySnapshot => {
          const newEntities = [];
          querySnapshot.forEach(doc => {
            const entity = doc.data();
            entity.id = doc.id;
            newEntities.push(entity);
          });
          this.setState({
            published: newEntities
          });
        },
        error => {}
      );
    draftsRef
      .where("userID", "==", this.props.userID)
      .orderBy("createdAt")
      .onSnapshot(
        querySnapshot => {
          const newEntities = [];
          querySnapshot.forEach(doc => {
            const entity = doc.data();
            entity.id = doc.id;
            newEntities.push(entity);
          });
          this.setState({
            drafts: newEntities
          });
        },
        error => {}
      );
    usersRef.where("id", "==", this.props.userID).onSnapshot(
      querySnapshot => {
        const newEntities = [];
        querySnapshot.forEach(doc => {
          const entity = doc.data();

          this.setState({
            photoUrl: doc.data().url,
            userName: doc.data().fullName,
            postsNum: doc.data().posts,
            likesNum: doc.data().likes,
            draftsNum: doc.data().drafts
          });
        });
      },
      error => {}
    );
  }

  renderDraftItem = ({ index, item }) => (
    <TouchableOpacity
      style={{ borderColor: "grey", borderWidth: 1 }}
      onPress={() => {
        this.props.navigation.navigate("Canvas", {
          initialData: item.canvasData,
          backgroundColor: item.backGroundColor,
          uid: this.props.userID,
          itemId: item.id
        });
      }}
      onLongPress={() => {
        Alert.alert(
          "Wish to delete it❓",
          "You can not restore once deleted!",
          [
            {
              text: "Cancel",
              onPress: () => {}
            },
            {
              text: "Detele",
              onPress: () => {
                this.deleteDraft(item);
              },
              style: "destructive"
            }
          ],
          { cancelable: false }
        );
      }}
    >
      <PixelArt
        data={item.canvasData}
        backgroundColor={item.backGroundColor}
        size={175}
      />
    </TouchableOpacity>
  );

  renderPublishItem = ({ index, item }) => (
    <TouchableOpacity
      style={{ borderColor: "grey", borderWidth: 1 }}
      onPress={() => {
        Alert.alert(
          "Wish to delete it❓",
          "You can not restore once deleted!",
          [
            {
              text: "Cancel",
              onPress: () => {}
            },
            {
              text: "Detele",
              onPress: () => {
                this.deletePhoto(item);
              },
              style: "destructive"
            }
          ],
          { cancelable: false }
        );
      }}
    >
      <PixelArt
        data={item.canvasData}
        backgroundColor={item.backGroundColor}
        size={175}
      />
    </TouchableOpacity>
  );

  render() {
    const { route, navigation } = this.props;
    return (
      <InfosWrapper>
        <HeaderWrapper>
          <Avatar>
            {this.state.userID === 0 ? (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Login");
                }}
              >
                <Image
                  source={{
                    uri: this.state.photoUrl
                  }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40
                  }}
                />
              </TouchableOpacity>
            ) : (
              <Image
                source={{
                  uri: this.state.photoUrl
                }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40
                }}
              />
            )}

            <UserName>
              {this.state.userID == 0 ? "Visitor" : this.state.userName}
            </UserName>
          </Avatar>
          <NumberWrapper>
            <Number>
              {this.state.userID == 0 ? 0 : this.state.published.length}
            </Number>
            <View>
              <Tag>Posts</Tag>
            </View>
          </NumberWrapper>
          <NumberWrapper>
            <Number>{this.state.userID == 0 ? 0 : this.state.likesNum}</Number>
            <View>
              <Tag>Likes</Tag>
            </View>
          </NumberWrapper>
          <NumberWrapper>
            <Number>
              {this.state.userID == 0 ? 0 : this.state.drafts.length}
            </Number>
            <View>
              <Tag>Drafts</Tag>
            </View>
          </NumberWrapper>
          <Col>
            <TouchableOpacity
              onPress={() => {
                if (this.state.userID != 0) {
                  Alert.alert(
                    "Attention",
                    "Are you sure to log out?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => {}
                      },
                      {
                        text: "Log Out",
                        onPress: () => {
                          this.onLogout();
                        },
                        style: "destructive"
                      }
                    ],
                    { cancelable: true }
                  );
                } else {
                  this.onLogout();
                }
              }}
            >
              <MoreIcon width={27} height={27} />
            </TouchableOpacity>
          </Col>
        </HeaderWrapper>

        <EditButton
          onPress={() => {
            if (this.props.userID === 0) {
              Alert.alert("Sorry", "You need to log in first.", [
                {
                  text: "No thanks",
                  onPress: () => {},
                  style: "cancel"
                },
                {
                  text: "Sure",
                  onPress: () => {
                    this.props.navigation.navigate("Login");
                  },
                  style: "destructive"
                }
              ]);
            } else {
              navigation.navigate("EditProfile", {
                name: this.state.userName,
                uid: this.props.userID,
                url: this.state.photoUrl
              });
            }
          }}
        >
          <EditProfile>Edit Profile</EditProfile>
        </EditButton>
        <ButtonsRow>
          <IconButton
            title="Published"
            onPress={() => this.setState({ showDrafts: false })}
            active={!this.state.showDrafts}
            icon="Picture"
            color="green"
          >
            <Text>Published</Text>
          </IconButton>
          <IconButton
            title="Drafts"
            onPress={() => this.setState({ showDrafts: true })}
            active={this.state.showDrafts}
            icon="EditPicture"
            color="yellow"
          >
            <Text>Drafts</Text>
          </IconButton>
        </ButtonsRow>
        <View style={{ backgroundColor: "gray" }}>
          {/* <Text>aa{this.state.publishImages2[0].title}aa</Text> */}
        </View>
        {this.state.userID === 0 ? (
          <SignBox>
            <EmptySign>
              <InfosText>Hi, there!!</InfosText>
            </EmptySign>
            <CatIcon width={45} height={45} />
            <EmptySign>
              <InfosText>🍻 Log in and enjoy the pixel art!</InfosText>
            </EmptySign>
          </SignBox>
        ) : !this.state.showDrafts ? (
          this.state.published.length == 0 ? (
            <SignBox>
              <EmptySign>
                <InfosText>Come on!!</InfosText>
              </EmptySign>
              <PawIcon width={80} height={80} />
              <EmptySign>
                <InfosText>🍻 Create your first pixel art!</InfosText>
              </EmptySign>
            </SignBox>
          ) : (
            <FlatGrid
              spacing={20}
              data={this.state.published}
              style={styles.gridView}
              renderItem={this.renderPublishItem}
            />
          )
        ) : this.state.drafts.length == 0 ? (
          <SignBox>
            <EmptySign>
              <InfosText>Come on!!</InfosText>
            </EmptySign>
            <PawIcon width={80} height={80} />
            <EmptySign>
              <InfosText>🍻 Create your first pixel art!</InfosText>
            </EmptySign>
          </SignBox>
        ) : (
          <FlatGrid
            data={this.state.drafts}
            style={styles.gridView}
            spacing={20}
            renderItem={this.renderDraftItem}
          />
        )}
      </InfosWrapper>
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 150
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600"
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff"
  },
  button: {
    height: 40,
    width: 100,
    backgroundColor: "grey",
    alignContent: "center",
    justifyContent: "center"
  }
});
