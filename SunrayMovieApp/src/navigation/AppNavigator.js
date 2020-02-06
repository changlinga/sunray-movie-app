import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

import PopularMovies from "../containers/PopularMoviesContainer";
import Trending from "../containers/TrendingContainer";

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
        title: "Sunray Movie"
      })
    }
  })
);
