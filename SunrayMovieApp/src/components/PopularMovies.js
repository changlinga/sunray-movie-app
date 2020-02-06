import React, { Component } from "react";
import { View, StyleSheet, FlatList, Alert, Dimensions } from "react-native";

import MediaItem from "./MediaItem";
import { moderateScale } from "../utility/UIScale";

export default class PopularMovies extends Component {
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
          data={this.props.movies.popular}
          renderItem={MediaItem}
        />
      </View>
    );
  }

  reload() {
    this.props.popularMoviesActions().then(() => {
      const { error } = this.props.movies;

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
