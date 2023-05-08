import * as types from "../Action-type";
const initialState = {
  classes: [],
  selectedClass: {},
};
const ClassReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GETCLASSES:
      return { ...state, classes: action.gotClasses };

    case types.GETCLASS:
      return { ...state, selectedClass: action.gotClass };
    default:
      return state;
  }
};
export default ClassReducer;
