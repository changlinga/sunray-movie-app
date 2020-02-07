import * as types from "../constants/actionTypes";

const initialState = {
  popular: [],
  loading: false,
  error: null
};

function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case types.POPULAR_MOVIES_REQUEST:
    case types.MOVIE_DETAILS_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });

    case types.POPULAR_MOVIES_SUCCESS:
      return Object.assign({}, state, {
        popular: action.movies,
        loading: false,
        error: null
      });

    case types.MOVIE_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        popular: state.popular.map(movie =>
          movie.id === action.movie.id ? { ...movie, ...action.movie } : movie
        ),
        loading: false,
        error: null
      });

    case types.POPULAR_MOVIES_FAILURE:
    case types.MOVIE_DETAILS_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });

    default:
      return state;
  }
}

export default moviesReducer;
