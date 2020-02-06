import * as types from "../constants/actionTypes";
import { TMDB_BASE_URL, TMDB_API_KEY } from "../constants/general";
import CustomError from "../utility/CustomError";

export function popularMoviesRequest() {
  return {
    type: types.POPULAR_MOVIES_REQUEST
  };
}

export function popularMoviesSuccess(movies) {
  return {
    type: types.POPULAR_MOVIES_SUCCESS,
    movies
  };
}

export function popularMoviesFailure(error) {
  return {
    type: types.POPULAR_MOVIES_FAILURE,
    error
  };
}

export function trendingMoviesRequest() {
  return {
    type: types.TRENDING_MOVIES_REQUEST
  };
}

export function trendingMoviesSuccess(movies) {
  return {
    type: types.TRENDING_MOVIES_SUCCESS,
    movies
  };
}

export function trendingMoviesFailure(error) {
  return {
    type: types.TRENDING_MOVIES_FAILURE,
    error
  };
}

export function popularMoviesActions() {
  return dispatch => {
    dispatch(popularMoviesRequest());

    let urlString = TMDB_BASE_URL + "/movie/popular?api_key=" + TMDB_API_KEY;

    return fetch(urlString, {
      method: "GET"
    })
      .then(response => {
        if (response.ok) {
          console.log("Response Success");
          return response.json().then(json => {
            dispatch(popularMoviesSuccess(json["results"]));
          });
        } else {
          console.log("Response Error");
          response.json().then(json => {
            let customError = new CustomError(
              json.status_code,
              json.status_message,
              "Retrieve Popular Movies Unsuccessful"
            );
            dispatch(popularMoviesFailure(customError));
          });
        }
      })
      .catch(error => {
        console.log("Error:", error);
        let customError = new CustomError(
          500,
          "Unable to retrieve popular movies",
          "Retrieve Popular Movies Unsuccessful"
        );
        dispatch(popularMoviesFailure(customError));
      });
  };
}

export function trendingMoviesActions() {
  return dispatch => {
    dispatch(trendingMoviesRequest());

    let urlString = TMDB_BASE_URL + "/trending/all/day?api_key=" + TMDB_API_KEY;

    return fetch(urlString, {
      method: "GET"
    })
      .then(response => {
        if (response.ok) {
          console.log("Response Success");
          return response.json().then(json => {
            dispatch(trendingMoviesSuccess(json["results"]));
          });
        } else {
          console.log("Response Error");
          response.json().then(json => {
            let customError = new CustomError(
              json.status_code,
              json.status_message,
              "Retrieve Trending Movies Unsuccessful"
            );
            dispatch(trendingMoviesFailure(customError));
          });
        }
      })
      .catch(error => {
        console.log("Error:", error);
        let customError = new CustomError(
          500,
          "Unable to retrieve trending movies",
          "Retrieve Trending Movies Unsuccessful"
        );
        dispatch(trendingMoviesFailure(customError));
      });
  };
}
