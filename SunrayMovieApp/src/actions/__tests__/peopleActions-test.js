import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import expect from "expect";
import * as peopleActions from "../../actions/peopleActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const PERSON_ID = 287;

describe("People Actions", () => {
  it("Creates PERSON_GET_SUCCESS when retrieve person is successful", () => {
    const store = mockStore();

    return store
      .dispatch(peopleActions.personGetActions(PERSON_ID))
      .then(() => {
        expect(store.getActions()[0]).toEqual(peopleActions.personGetRequest());
        expect(store.getActions()[1].error).toBe(undefined);
        expect(store.getActions()[1].person).toBeTruthy();
        verifyPerson(store.getActions()[1].person);
      });
  });

  it("Creates PERSON_MOVIE_CREDITS_SUCCESS when retrieve movie credits is successful", () => {
    const store = mockStore();

    return store
      .dispatch(peopleActions.personMovieCreditsAction(PERSON_ID))
      .then(() => {
        expect(store.getActions()[0]).toEqual(
          peopleActions.personMovieCreditsRequest()
        );
        expect(store.getActions()[1].error).toBe(undefined);
        expect(store.getActions()[1].person).toBeTruthy();
        verifyMovieCredits(store.getActions()[1].person);
      });
  });
});

function verifyPerson(person) {
  expect(person.name).toBeTruthy();
  expect(person.biography).toBeTruthy();
  expect(person.birthday).toBeTruthy();
}

function verifyMovieCredits(person) {
  expect(Array.isArray(person.cast)).toBe(true);
  expect(Array.isArray(person.crew)).toBe(true);
  person.cast.forEach(c => {
    verifyCast(c);
  });
}

function verifyCast(cast) {
  expect(cast.title).toBeTruthy();
}
