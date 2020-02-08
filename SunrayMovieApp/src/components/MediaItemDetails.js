import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  RefreshControl,
  FlatList
} from "react-native";
import { Avatar } from "react-native-elements";

import { TMDB_IMAGE_BASE_URL } from "../constants/general";
import { moderateScale } from "../utility/UIScale";
import { TouchableOpacity } from "react-native-gesture-handler";
import { addListener } from "expo/build/Updates/Updates";

const { width, height } = Dimensions.get("window");

export default class MediaItemDetails extends Component {
  static navigationOptions = ({ navigation }) => ({
    title:
      navigation.state.params.item.title || navigation.state.params.item.name
  });

  componentDidMount() {
    this.reload();
  }

  render() {
    const { item } = this.props.navigation.state.params;

    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.props.movies.loading}
            onRefresh={this.reload.bind(this)}
          />
        }
      >
        <Image
          style={styles.itemImage}
          source={{
            uri: TMDB_IMAGE_BASE_URL + "/w500" + item.backdrop_path
          }}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.itemTitle}>{item.title || item.name}</Text>
          <View style={styles.captionContainer1}>
            <Text style={[styles.itemCaption1, styles.itemYear]}>
              ({item.release_date.substring(0, 4)})
            </Text>
            <Text style={styles.itemCaption1}>{item.runtime} minutes</Text>
          </View>
          <View style={styles.itemGenresContainer}>
            {item.genres &&
              item.genres.map((genre, index) => (
                <Text key={genre.id} style={styles.itemCaption1}>
                  {genre.name + (index !== item.genres.length - 1 ? " | " : "")}
                </Text>
              ))}
          </View>
          <Text style={styles.itemOverview}>{item.overview}</Text>
          <Text style={styles.itemSubtitle}>Cast</Text>
        </View>
        <FlatList
          horizontal={true}
          data={item.cast}
          renderItem={this.renderCast.bind(this)}
          keyExtractor={cast => cast.id.toString()}
        />
      </ScrollView>
    );
  }

  renderCast({ item }) {
    return (
      <TouchableOpacity
        style={styles.castContainer}
        onPress={() => {
          this.props.navigation.navigate("Person", {
            id: item.id,
            name: item.name
          });
        }}
      >
        <Avatar
          rounded
          size={width / 6}
          source={{
            uri: TMDB_IMAGE_BASE_URL + "/w500" + item.profile_path
          }}
        />
        <Text style={styles.castName}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  reload() {
    const { item } = this.props.navigation.state.params;

    this.props.movieDetailsAction(item.id).then(this.processDetails.bind(this));
    this.props.movieCreditsAction(item.id).then(this.processDetails.bind(this));
  }

  processDetails() {
    const { item } = this.props.navigation.state.params;
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

    this.props.navigation.setParams({
      item: popular.find(movie => movie.id === item.id)
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  detailsContainer: {
    margin: moderateScale(15)
  },

  itemTitle: {
    fontSize: moderateScale(25),
    fontWeight: "bold"
  },

  itemImage: {
    height: moderateScale(height / 3)
  },

  captionContainer1: {
    flexDirection: "row"
  },

  itemCaption1: {
    color: "grey",
    fontSize: moderateScale(13)
  },

  itemYear: {
    flex: 1
  },

  itemGenresContainer: {
    flexDirection: "row"
  },

  itemOverview: {
    marginTop: moderateScale(15),
    fontSize: moderateScale(15),
    textAlign: "justify"
  },

  itemSubtitle: {
    marginTop: moderateScale(15),
    fontSize: moderateScale(15),
    fontWeight: "bold"
  },

  castContainer: {
    width: moderateScale(width / 4.7),
    paddingHorizontal: moderateScale(5),
    alignItems: "center"
  },

  castName: {
    fontSize: moderateScale(13),
    textAlign: "center"
  }
});
