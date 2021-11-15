import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, View, TextInput, Image, Button } from 'react-native';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';

let array = [];
for (let i = 0; i < 25; i++) {
  array.push(0);
}

export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ids: array,
      color: 'pink',
    };
  }

  static defaultProps = {};

  onResponderGrant(id, ev) {
    let ids = this.state.ids;
    ids[id] = 1;
    this.setState({
      ids,
    });
    console.log(`press start${id}`);
  }

  onResponderMove(id, ev) {
    let ids = this.state.ids;
    ids[id] = 1;
    this.setState({
      ids,
    });
    console.log(`press move${id}`);
  }

  onResponderReject(id, ev) {
    let ids = this.state.ids;
    ids[id] = 1;
    this.setState({
      ids,
    });
    console.log(`reject${id}`);
  }

  createGrid = () => {
    let grid = [];

    let cellColored = {
      backgroundColor: this.state.color,
      height: 40,
      width: 40,
      margin: 5,
    };

    for (let j = 0; j < 25; j++) {
      grid.push(
        <View
          id={j}
          key={j}
          style={this.state.ids[j] === 0 ? styles.cell : cellColored}
          onStartShouldSetResponder={(ev) => true}
          onMoveShouldSetResponder={(ev) => true}
          onResponderGrant={(ev) => this.onResponderGrant(j, ev)}
          onResponderMove={(ev) => this.onResponderMove(j, ev)}
          onResponderRelease={(ev) => {}}
          onResponderTerminationRequest={(ev) => true}
          onResponderTer={(ev) => {}}>
          <Text>{this.state.ids[j]}</Text>
        </View>
      );
    }
    return grid;
  };

  render() {
    const { route, navigation } = this.props;
    const { newColor } = route.params == null ? 'grey' : route.params;
    return (
      <View style={styles.grid}>
        {this.createGrid()}
        <Button
          title="Pick Color"
          onPress={() => {
            this.props.navigation.navigate('ColorPicker');
          }}
        />
        <Button
          title="Set Color"
          onPress={() => {
            this.setState({ color: newColor });
          }}
        />

        <Text>color:{JSON.stringify(newColor)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  grid: {
    height: 260,
    width: 260,
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    backgroundColor: 'grey',
    height: 40,
    width: 40,
    margin: 5,
  },
  cellColored: {
    backgroundColor: 'coral',
    height: 40,
    width: 40,
    margin: 5,
  },
});
