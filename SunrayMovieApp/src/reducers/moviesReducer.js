import * as types from "../constants/actionTypes";

const initialState = {
  popular: [],
  loading: false,
  error: null
};

function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case types.POPULAR_MOVIES_REQUEST:
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

    case types.POPULAR_MOVIES_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });

    default:
      return state;
  }
}

export default moviesReducer;