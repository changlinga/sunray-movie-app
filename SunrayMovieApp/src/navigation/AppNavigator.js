import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Home from "../containers/HomeContainer";

export default createAppContainer(
  createStackNavigator({
    Home: Home
  })
);
