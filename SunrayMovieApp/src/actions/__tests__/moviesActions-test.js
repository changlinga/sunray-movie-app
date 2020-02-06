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
});

function verifyMovie(movie) {
  expect(movie.title).toBeTruthy();
  expect(movie.poster_path).toBeTruthy();
}
