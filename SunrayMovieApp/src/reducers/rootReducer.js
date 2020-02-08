import { combineReducers } from "redux";
import moviesReducer from "./moviesReducer";
import trendingReducer from "./trendingReducer";
import searchReducer from "./searchReducer";
import peopleReducer from "./peopleReducer";

const rootReducer = combineReducers({
  movies: moviesReducer,
  trending: trendingReducer,
  search: searchReducer,
  people: peopleReducer
});

export default rootReducer;
