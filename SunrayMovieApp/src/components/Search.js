import React, { Component } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  FlatList,
  Alert,
  SafeAreaView
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
    search: "",
    movies: []
  };

  componentDidMount() {
    // Focus method here does not work without delaying the call
    setTimeout(() => {
      this.search.focus();
    }, 100);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ height: statusBarHeight }}>
          <StatusBar barStyle="dark-content" backgroundColor="#000000" />
        </View>
        <View style={styles.topContainer}>
          <HeaderBackButton onPress={() => this.props.navigation.pop()} />
          <SearchBar
            ref={search => (this.search = search)}
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
          data={this.state.movies}
          renderItem={({ item }) => (
            <MediaItem item={item} navigation={this.props.navigation} />
          )}
        />
      </SafeAreaView>
    );
  }

  _onSearchBarChangeText(text) {
    this.setState({
      search: text
    });

    this.props.searchMoviesActions(text).then(() => {
      const { movies, error } = this.props.search;

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

      this.setState({
        movies
      });
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
