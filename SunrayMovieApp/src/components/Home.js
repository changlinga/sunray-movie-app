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
import { SearchBar } from "react-native-elements";

import { TMDB_IMAGE_BASE_URL } from "../constants/general";
import { moderateScale } from "../utility/UIScale";

const { width, height } = Dimensions.get("window");

const statusBarHeight =
  Platform.OS === "android"
    ? StatusBar.currentHeight || (Platform.Version < 23 ? 25 : 24)
    : 0;

export default class Home extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerShown: false
  });

  state = {
    search: "",
    movies: []
  };

  componentDidMount() {
    this.reload();
  }

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
        <FlatList
          numColumns={2}
          style={styles.listStyle}
          columnWrapperStyle={styles.columnWrapperStyle}
          data={this.state.movies}
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

  _onItemPressed() {}

  reload() {
    this.props.popularMoviesActions().then(() => {
      const { popular, error } = this.props.movies;

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
        movies: popular
      });
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
