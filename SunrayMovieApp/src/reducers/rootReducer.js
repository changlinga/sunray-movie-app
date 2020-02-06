import { combineReducers } from "redux";
import moviesReducer from "./moviesReducer";
import trendingReducer from "./trendingReducer";

const rootReducer = combineReducers({
  movies: moviesReducer,
  trending: trendingReducer
});

export default rootReducer;
