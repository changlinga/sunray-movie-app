import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import expect from "expect";
import * as searchActions from "../../actions/searchActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Search Actions", () => {
  it("Creates SEARCH_MOVIES_SUCCESS when retrieve movies is successful", () => {
    const store = mockStore();

    return store
      .dispatch(searchActions.searchMoviesActions("avenger"))
      .then(() => {
        expect(store.getActions()[0]).toEqual(
          searchActions.searchMoviesRequest()
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
