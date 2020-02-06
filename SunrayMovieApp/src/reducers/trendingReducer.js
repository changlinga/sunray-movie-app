import * as types from "../constants/actionTypes";

const initialState = {
  trending: [],
  loading: false,
  error: null
};

function trendingReducer(state = initialState, action) {
  switch (action.type) {
    case types.TRENDING_GET_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });

    case types.TRENDING_GET_SUCCESS:
      return Object.assign({}, state, {
        trending: action.trending,
        loading: false,
        error: null
      });

    case types.TRENDING_GET_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });

    default:
      return state;
  }
}

export default trendingReducer;
