import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import expect from "expect";
import * as moviesActions from "../../actions/moviesActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Movies Actions", () => {
  it("Creates POPULAR_MOVIES_SUCCESS when retrieve popular movies is successful", () => {
    const store = mockStore();

    return store.dispatch(moviesActions.popularMoviesActions()).then(() => {
      expect(store.getActions()[0]).toEqual(
        moviesActions.popularMoviesRequest()
      );
      expect(store.getActions()[1].error).toBe(undefined);
      expect(store.getActions()[1].movies).toBeTruthy();
      store.getActions()[1].movies.forEach(movie => {
        verifyMovie(movie);
      });
    });
  });

  it("Creates MOVIE_DETAILS_SUCCESS when retrieve movie is successful", () => {
    const store = mockStore();

    return store.dispatch(moviesActions.movieDetailsAction(419704)).then(() => {
      expect(store.getActions()[0]).toEqual(
        moviesActions.movieDetailsRequest()
      );
      expect(store.getActions()[1].error).toBe(undefined);
      expect(store.getActions()[1].movie).toBeTruthy();
      verifyMovieDetails(store.getActions()[1].movie);
    });
  });
});

function verifyMovie(movie) {
  expect(movie.title).toBeTruthy();
  expect(movie.poster_path).toBeTruthy();
}

function verifyMovieDetails(movie) {
  expect(movie.title).toBeTruthy();
  expect(movie.backdrop_path).toBeTruthy();
  expect(movie.genres).toBeTruthy();
  expect(movie.release_date).toBeTruthy();
}
