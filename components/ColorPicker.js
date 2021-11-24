import React from "react";
import { Button, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { TriangleColorPicker, fromHsv } from "react-native-color-picker";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      newColor: "pink"
    };
  }

  onColorChange(color) {
    let newColor = fromHsv(color);
    this.setState({ newColor });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, padding: 45, backgroundColor: "#212021" }}>
          <Button
            title="Confirm"
            onPress={() => {
              this.props.navigation.navigate("Canvas", {
                newColor: this.state.newColor
              });
            }}
          />

          <TriangleColorPicker
            oldColor="white"
            onColorChange={color => this.onColorChange(color)}
            style={{ flex: 1 }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 45,
    backgroundColor: "#212021"
  },
  touchable: {
    padding: 5
  },
  text: {
    color: "white"
  }
});

export default App;
