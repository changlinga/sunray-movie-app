import React from "react";
import {
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions
} from "react-native";

import { TMDB_IMAGE_BASE_URL } from "../constants/general";
import { moderateScale } from "../utility/UIScale";

const { width, height } = Dimensions.get("window");

export default ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        navigation.navigate("MediaItemDetails", {
          item
        });
      }}
    >
      <Image
        style={styles.itemImage}
        source={{
          uri: TMDB_IMAGE_BASE_URL + "/w500" + item.poster_path
        }}
      />
      <Text style={styles.itemTitle}>{item.title || item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
