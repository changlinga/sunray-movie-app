import * as types from "../constants/actionTypes";
import { TMDB_BASE_URL, TMDB_API_KEY } from "../constants/general";
import CustomError from "../utility/CustomError";

export function personGetRequest() {
  return {
    type: types.PERSON_GET_REQUEST
  };
}

export function personGetSuccess(person) {
  return {
    type: types.PERSON_GET_SUCCESS,
    person
  };
}

export function personGetFailure(error) {
  return {
    type: types.PERSON_GET_FAILURE,
    error
  };
}

export function personMovieCreditsRequest() {
  return {
    type: types.PERSON_MOVIE_CREDITS_REQUEST
  };
}

export function personMovieCreditsSuccess(person) {
  return {
    type: types.PERSON_MOVIE_CREDITS_SUCCESS,
    person
  };
}

export function personMovieCreditsFailure(error) {
  return {
    type: types.PERSON_MOVIE_CREDITS_FAILURE,
    error
  };
}

/**
 * Get the primary person details by id.
 * @param person_id
 */
export function personGetActions(person_id) {
  return dispatch => {
    dispatch(personGetRequest());

    let urlString =
      TMDB_BASE_URL + `/person/${person_id}?api_key=${TMDB_API_KEY}`;

    return fetch(urlString, {
      method: "GET"
    })
      .then(response => {
        if (response.ok) {
          console.log("Response Success");
          return response.json().then(json => {
            dispatch(personGetSuccess(json));
          });
        } else {
          console.log("Response Error");
          response.json().then(json => {
            let customError = new CustomError(
              json.status_code,
              json.status_message,
              "Retrieve Person Unsuccessful"
            );
            dispatch(personGetFailure(customError));
          });
        }
      })
      .catch(error => {
        console.log("Error:", error);
        let customError = new CustomError(
          500,
          "Unable to retrieve person",
          "Retrieve Person Unsuccessful"
        );
        dispatch(personGetFailure(customError));
      });
  };
}

/**
 * Get the movie credits for a person.
 * @param person_id
 */
export function personMovieCreditsAction(person_id) {
  return dispatch => {
    dispatch(personMovieCreditsRequest());

    let urlString = `${TMDB_BASE_URL}/person/${person_id}/movie_credits?api_key=${TMDB_API_KEY}`;

    return fetch(urlString, {
      method: "GET"
    })
      .then(response => {
        if (response.ok) {
          console.log("Response Success");
          return response.json().then(json => {
            dispatch(personMovieCreditsSuccess(json));
          });
        } else {
          console.log("Response Error");
          response.json().then(json => {
            let customError = new CustomError(
              json.status_code,
              json.status_message,
              "Retrieve Movie Credits Unsuccessful"
            );
            dispatch(personMovieCreditsFailure(customError));
          });
        }
      })
      .catch(error => {
        console.log("Error:", error);
        let customError = new CustomError(
          500,
          "Unable to retrieve movie credits",
          "Retrieve Movie Credits Unsuccessful"
        );
        dispatch(personMovieCreditsFailure(customError));
      });
  };
}
