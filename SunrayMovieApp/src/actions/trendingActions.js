import * as types from "../constants/actionTypes";
import { TMDB_BASE_URL, TMDB_API_KEY } from "../constants/general";
import CustomError from "../utility/CustomError";

export function trendingGetRequest() {
  return {
    type: types.TRENDING_GET_REQUEST
  };
}

export function trendingGetSuccess(trending) {
  return {
    type: types.TRENDING_GET_SUCCESS,
    trending
  };
}

export function trendingGetFailure(error) {
  return {
    type: types.TRENDING_GET_FAILURE,
    error
  };
}

export function trendingGetActions() {
  return dispatch => {
    dispatch(trendingGetRequest());

    let urlString = TMDB_BASE_URL + "/trending/all/day?api_key=" + TMDB_API_KEY;

    return fetch(urlString, {
      method: "GET"
    })
      .then(response => {
        if (response.ok) {
          console.log("Response Success");
          return response.json().then(json => {
            dispatch(trendingGetSuccess(json["results"]));
          });
        } else {
          console.log("Response Error");
          response.json().then(json => {
            let customError = new CustomError(
              json.status_code,
              json.status_message,
              "Retrieve Trending Unsuccessful"
            );
            dispatch(trendingGetFailure(customError));
          });
        }
      })
      .catch(error => {
        console.log("Error:", error);
        let customError = new CustomError(
          500,
          "Unable to retrieve trending",
          "Retrieve Trending Unsuccessful"
        );
        dispatch(trendingGetFailure(customError));
      });
  };
}
