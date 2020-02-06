import * as types from "../constants/actionTypes";

const initialState = {
  movies: [],
  loading: false,
  error: null
};

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case types.SEARCH_MOVIES_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });

    case types.SEARCH_MOVIES_SUCCESS:
      return Object.assign({}, state, {
        movies: action.movies,
        loading: false,
        error: null
      });

    case types.SEARCH_MOVIES_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });

    default:
      return state;
  }
}

export default searchReducer;
