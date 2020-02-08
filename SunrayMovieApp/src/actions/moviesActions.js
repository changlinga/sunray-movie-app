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

export function movieDetailsRequest() {
  return {
    type: types.MOVIE_DETAILS_REQUEST
  };
}

export function movieDetailsSuccess(movie) {
  return {
    type: types.MOVIE_DETAILS_SUCCESS,
    movie
  };
}

export function movieDetailsFailure(error) {
  return {
    type: types.MOVIE_DETAILS_FAILURE,
    error
  };
}

export function movieCreditsRequest() {
  return {
    type: types.MOVIE_CREDITS_REQUEST
  };
}

export function movieCreditsSuccess(movie) {
  return {
    type: types.MOVIE_CREDITS_SUCCESS,
    movie
  };
}

export function movieCreditsFailure(error) {
  return {
    type: types.MOVIE_CREDITS_FAILURE,
    error
  };
}

/**
 * Get a list of the current popular movies.
 */
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

/**
 * Get the primary information about a movie.
 * @param movie_id
 */
export function movieDetailsAction(movie_id) {
  return dispatch => {
    dispatch(movieDetailsRequest());

    let urlString =
      TMDB_BASE_URL + `/movie/${movie_id}?api_key=${TMDB_API_KEY}`;

    return fetch(urlString, {
      method: "GET"
    })
      .then(response => {
        if (response.ok) {
          console.log("Response Success");
          return response.json().then(json => {
            dispatch(movieDetailsSuccess(json));
          });
        } else {
          console.log("Response Error");
          response.json().then(json => {
            let customError = new CustomError(
              json.status_code,
              json.status_message,
              "Retrieve Movie Unsuccessful"
            );
            dispatch(movieDetailsFailure(customError));
          });
        }
      })
      .catch(error => {
        console.log("Error:", error);
        let customError = new CustomError(
          500,
          "Unable to retrieve movie",
          "Retrieve Movie Unsuccessful"
        );
        dispatch(movieDetailsFailure(customError));
      });
  };
}

/**
 * Get the cast and crew for a movie.
 * @param movie_id
 */
export function movieCreditsAction(movie_id) {
  return dispatch => {
    dispatch(movieCreditsRequest());

    let urlString =
      TMDB_BASE_URL + `/movie/${movie_id}/credits?api_key=${TMDB_API_KEY}`;

    return fetch(urlString, {
      method: "GET"
    })
      .then(response => {
        if (response.ok) {
          console.log("Response Success");
          return response.json().then(json => {
            dispatch(movieCreditsSuccess(json));
          });
        } else {
          console.log("Response Error");
          response.json().then(json => {
            let customError = new CustomError(
              json.status_code,
              json.status_message,
              "Retrieve Credits Unsuccessful"
            );
            dispatch(movieCreditsFailure(customError));
          });
        }
      })
      .catch(error => {
        console.log("Error:", error);
        let customError = new CustomError(
          500,
          "Unable to retrieve credits",
          "Retrieve Credits Unsuccessful"
        );
        dispatch(movieCreditsFailure(customError));
      });
  };
}
