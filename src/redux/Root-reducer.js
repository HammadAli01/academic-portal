import { combineReducers } from "redux";
import userReducer from "./reducers/Reducer";
import courseReducer from "./reducers/courseReducer";
import ClassReducer from "./reducers/classesReducers";
const allReducer = combineReducers({
  user: userReducer,
  course: courseReducer,
  class: ClassReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return allReducer(state, action);
};
export default rootReducer;
