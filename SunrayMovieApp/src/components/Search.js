import React, { Component } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  FlatList,
  Alert
} from "react-native";
import { SearchBar } from "react-native-elements";
import { HeaderBackButton } from "react-navigation-stack";

import MediaItem from "./MediaItem";
import { moderateScale } from "../utility/UIScale";

const statusBarHeight =
  Platform.OS === "android"
    ? StatusBar.currentHeight || (Platform.Version < 23 ? 25 : 24)
    : 0;

export default class Search extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerShown: false
  });

  state = {
    search: ""
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: statusBarHeight }}>
          <StatusBar barStyle="light-content" backgroundColor="#000000" />
        </View>
        <View style={styles.topContainer}>
          <HeaderBackButton onPress={() => this.props.navigation.pop()} />
          <SearchBar
            lightTheme
            containerStyle={styles.searchBarContainer}
            onChangeText={this._onSearchBarChangeText.bind(this)}
            placeholder="Search Movies"
            value={this.state.search}
          />
        </View>
        <FlatList
          numColumns={2}
          style={styles.listStyle}
          columnWrapperStyle={styles.columnWrapperStyle}
          data={this.props.search.movies}
          renderItem={({ item }) => (
            <MediaItem item={item} navigation={this.props.navigation} />
          )}
        />
      </View>
    );
  }

  _onSearchBarChangeText(text) {
    this.setState({
      search: text
    });

    this.props.searchMoviesActions(text).then(() => {
      const { error } = this.props.search;

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

  topContainer: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth
  },

  searchBarContainer: {
    flex: 1,
    backgroundColor: "transparent",
    borderBottomWidth: 0
  },

  listStyle: {
    paddingVertical: moderateScale(10)
  },

  columnWrapperStyle: {
    justifyContent: "space-evenly"
  }
});
