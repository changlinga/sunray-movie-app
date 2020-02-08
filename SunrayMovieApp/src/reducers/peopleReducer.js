import * as types from "../constants/actionTypes";

const initialState = {
  people: [],
  loading: false,
  error: null
};

function peopleReducer(state = initialState, action) {
  switch (action.type) {
    case types.PERSON_GET_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });

    case types.PERSON_GET_SUCCESS:
      return Object.assign({}, state, {
        people: state.people.find(person => person.id === action.person.id)
          ? state.people.map(person =>
              person.id === action.person.id
                ? { ...person, ...action.person }
                : person
            )
          : [...state.people, action.person],
        loading: false,
        error: null
      });

    case types.PERSON_GET_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error
      });

    default:
      return state;
  }
}

export default peopleReducer;
