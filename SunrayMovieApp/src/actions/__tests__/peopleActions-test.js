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
});

function verifyPerson(person) {
  expect(person.name).toBeTruthy();
  expect(person.biography).toBeTruthy();
  expect(person.birthday).toBeTruthy();
}
