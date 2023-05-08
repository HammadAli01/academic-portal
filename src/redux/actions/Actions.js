import * as types from "../Action-type";
import axios from "axios";
import store from "../Store";
const userRegistered = () => ({
  type: types.SIGNUPUSER,
});
const userLogged = (user) => ({
  type: types.SIGNINUSER,
  user: user,
});
const usersGot = (users) => ({
  type: types.GETUSERS,
  users: users,
});
export const resetStore = () => {
  return {
    type: types.RESET_STORE,
  };
};
export const registerUser = (user) => {
  console.log("user got ", user, process.env.REACT_APP_API);
  return function (dispatch) {
    axios
      .post(`${process.env.REACT_APP_API}/users`, user)
      .then((response) => {
        console.log("response by adding data is => ", response);
        dispatch(userRegistered());
      })
      .catch((error) => console.log(error));
  };
};
export const loginUser = (user) => {
  return async function (dispatch) {
    try {
      let result = await axios.get(
        `${process.env.REACT_APP_API}/users/?email=${user.email}`
      );
      console.log("result", result);
      dispatch(userLogged(result.data[0]));
    } catch (error) {
      console.log("Error in signin is ", error);
    }
  };
};
export const getUsers = (role) => {
  return async function (dispatch) {
    try {
      let result = await axios.get(
        `${process.env.REACT_APP_API}/users/?role=${role}`
      );
      console.log("result after getting specific users ", result);
      dispatch(usersGot(result.data));
    } catch (error) {
      console.log("Error is ", error);
    }
  };
};
export const updateUser = (user) => {
  return async function (dispatch) {
    try {
      let result = await axios.put(
        `${process.env.REACT_APP_API}/users/${user.id}`,
        user
      );
    } catch (error) {
      console.log("Error is ", error);
    }
  };
};
