import { combineReducers } from "redux";
import moviesReducer from "./moviesReducer";
import trendingReducer from "./trendingReducer";
import searchReducer from "./searchReducer";

const rootReducer = combineReducers({
  movies: moviesReducer,
  trending: trendingReducer,
  search: searchReducer
});

export default rootReducer;
