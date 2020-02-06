import * as types from "../constants/actionTypes";
import { TMDB_BASE_URL, TMDB_API_KEY } from "../constants/general";
import CustomError from "../utility/CustomError";

export function searchMoviesRequest() {
  return {
    type: types.SEARCH_MOVIES_REQUEST
  };
}

export function searchMoviesSuccess(movies) {
  return {
    type: types.SEARCH_MOVIES_SUCCESS,
    movies
  };
}

export function searchMoviesFailure(error) {
  return {
    type: types.SEARCH_MOVIES_FAILURE,
    error
  };
}

export function searchMoviesActions(query) {
  return dispatch => {
    dispatch(searchMoviesRequest());

    let urlString =
      TMDB_BASE_URL +
      "/search/movie?api_key=" +
      TMDB_API_KEY +
      "&query=" +
      query;

    return fetch(urlString, {
      method: "GET"
    })
      .then(response => {
        if (response.ok) {
          console.log("Response Success");
          return response.json().then(json => {
            dispatch(searchMoviesSuccess(json["results"]));
          });
        } else {
          console.log("Response Error");
          response.json().then(json => {
            let customError = new CustomError(
              json.status_code,
              json.status_message,
              "Retrieve Movies Unsuccessful"
            );
            dispatch(searchMoviesFailure(customError));
          });
        }
      })
      .catch(error => {
        console.log("Error:", error);
        let customError = new CustomError(
          500,
          "Unable to retrieve movies",
          "Retrieve Movies Unsuccessful"
        );
        dispatch(searchMoviesFailure(customError));
      });
  };
}
