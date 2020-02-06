import React, { Component } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";

import MediaItem from "./MediaItem";
import { moderateScale } from "../utility/UIScale";

export default class Trending extends Component {
  componentDidMount() {
    this.reload();
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          numColumns={2}
          style={styles.listStyle}
          columnWrapperStyle={styles.columnWrapperStyle}
          data={this.props.trending.trending}
          renderItem={MediaItem}
        />
      </View>
    );
  }

  reload() {
    this.props.trendingGetActions().then(() => {
      const { error } = this.props.trending;

      if (error) {
        Alert.alert(
          error.title,
          error.message,
          [
            {
              text: "OK"
            }
          ],
          {
            cancelable: false
          }
        );
        return;
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  listStyle: {
    paddingVertical: moderateScale(10)
  },

  columnWrapperStyle: {
    justifyContent: "space-evenly"
  }
});
