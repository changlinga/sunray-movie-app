import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import expect from "expect";
import * as trendingActions from "../../actions/trendingActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Trending Actions", () => {
  it("Creates TRENDING_GET_SUCCESS when retrieve trending is successful", () => {
    const store = mockStore();

    return store.dispatch(trendingActions.trendingGetActions()).then(() => {
      expect(store.getActions()[0]).toEqual(
        trendingActions.trendingGetRequest()
      );
      expect(store.getActions()[1].error).toBe(undefined);
      expect(store.getActions()[1].trending).toBeTruthy();
      store.getActions()[1].trending.forEach(trend => {
        if (trend.media_type === "movie") {
          verifyMovie(trend);
        } else if (trend.media_type === "tv") {
          verifyTV(trend);
        }
      });
    });
  });
});

function verifyMovie(movie) {
  expect(movie.title).toBeTruthy();
  expect(movie.poster_path).toBeTruthy();
}

function verifyTV(tv) {
  expect(tv.name).toBeTruthy();
  expect(tv.poster_path).toBeTruthy();
}
