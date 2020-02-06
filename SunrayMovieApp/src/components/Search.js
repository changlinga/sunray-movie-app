import React, { Component } from "react";
import { View, StyleSheet, StatusBar, Platform } from "react-native";
import { SearchBar } from "react-native-elements";
import { HeaderBackButton } from "react-navigation-stack";

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
            placeholder="Search"
            value={this.state.search}
          />
        </View>
      </View>
    );
  }

  _onSearchBarChangeText(text) {
    this.setState({
      search: text
    });

    let searchItems = text
      .toLowerCase()
      .trim()
      .split(/\s+/);

    let movies = this.props.movies.popular.filter(movie => {
      let matches = searchItems.map(searchItem => {
        return (
          movie.title && movie.title.toLowerCase().indexOf(searchItem) !== -1
        );
      });

      return matches.indexOf(false) === -1;
    });

    this.setState({ movies });
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
  }
});
