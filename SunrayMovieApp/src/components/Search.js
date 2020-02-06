import React, { Component } from "react";
import { View, StyleSheet, StatusBar, Platform } from "react-native";
import { SearchBar } from "react-native-elements";

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
        <SearchBar
          lightTheme
          onChangeText={this._onSearchBarChangeText.bind(this)}
          placeholder="Search by Title"
          value={this.state.search}
        />
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
  }
});
