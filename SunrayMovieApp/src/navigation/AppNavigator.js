import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { Icon } from "react-native-elements";

import PopularMovies from "../containers/PopularMoviesContainer";
import Trending from "../containers/TrendingContainer";
import Search from "../containers/SearchContainer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { moderateScale } from "../utility/UIScale";

const HomeTabNavigator = createMaterialTopTabNavigator(
  {
    PopularMovies: {
      screen: PopularMovies,
      navigationOptions: ({ navigation }) => ({
        title: "Popular"
      })
    },
    Trending: {
      screen: Trending,
      navigationOptions: ({ navigation }) => ({
        title: "Trending"
      })
    }
  },
  {}
);

export default createAppContainer(
  createStackNavigator({
    Home: {
      screen: HomeTabNavigator,
      navigationOptions: ({ navigation }) => ({
        title: "Sunray Movie",
        headerRight: () => (
          <TouchableOpacity
            style={{ marginRight: moderateScale(10) }}
            onPress={() => {
              navigation.navigate("Search");
            }}
          >
            <Icon name="search" />
          </TouchableOpacity>
        )
      })
    },
    Search: {
      screen: Search
    }
  })
);
