import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  Platform
} from "react-native";

import { TMDB_IMAGE_BASE_URL } from "../constants/general";
import { moderateScale } from "../utility/UIScale";

const { width, height } = Dimensions.get("window");

export default class Home extends Component {
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
          renderItem={this.renderItem.bind(this)}
        />
      </View>
    );
  }

  renderItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={this._onItemPressed.bind(this)}
      >
        <Image
          style={styles.itemImage}
          source={{
            uri: TMDB_IMAGE_BASE_URL + "/w500" + item.poster_path
          }}
        />
        <Text style={styles.itemTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  }

  _onItemPressed() {}

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
  },

  itemContainer: {
    width: moderateScale(width / 2 - 20),
    marginBottom: moderateScale(10)
  },

  itemTitle: {
    fontSize: moderateScale(15),
    fontWeight: "bold"
  },

  itemImage: {
    height: moderateScale(height / 3)
  }
});
