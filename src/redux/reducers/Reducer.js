import * as types from "../Action-type";
const initialState = {
  user: {},
  users: [],
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGNINUSER:
      return { ...state, user: action.user };
    case types.SIGNUPUSER:
      return { ...state };
    case types.GETUSERS:
      return { ...state, users: action.users };
    default:
      return state;
  }
};
export default userReducer;
