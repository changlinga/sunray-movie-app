import * as types from "../constants/actionTypes";

const initialState = {
  popular: [],
  movies: [],
  loading: false,
  error: null
};

function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case types.POPULAR_MOVIES_REQUEST:
    case types.MOVIE_DETAILS_REQUEST:
    case types.MOVIE_CREDITS_REQUEST:
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
    case types.MOVIE_CREDITS_SUCCESS:
      return Object.assign({}, state, {
        movies: state.movies.find(movie => movie.id === action.movie.id)
          ? state.movies.map(movie =>
              movie.id === action.movie.id
                ? { ...movie, ...action.movie }
                : movie
            )
          : [...state.movies, action.movie],
        loading: false,
        error: null
      });

    case types.POPULAR_MOVIES_FAILURE:
    case types.MOVIE_DETAILS_FAILURE:
    case types.MOVIE_CREDITS_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });

    default:
      return state;
  }
}

export default moviesReducer;
