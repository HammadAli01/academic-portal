import * as types from "../Action-type";
const initialState = {
  courses: [],
  teacher: {},
  teachers: [],
  courseSelected: {},
  requests: [],
  quizes: [],
  quizSelected: {},
  exams: [],
};
const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GETCOURSES:
      return { ...state, courses: action.payload };
    case types.ADDCOURSES:
      return { ...state };
    case types.GETALLCOURSES:
      return { ...state, courses: action.payload };
    case types.GETTEACHER:
      return { ...state, teacher: action.payload };
    case types.GETCOURSE:
      return { ...state, courseSelected: action.payload };
    case types.ADDLEAVEREQUEST:
      return { ...state };
    case types.GETREQUESTS:
      return { ...state, requests: action.payload };
    case types.GETQUIZES:
      return { ...state, quizes: action.payload };
    case types.GETQUIZ:
      return { ...state, quizSelected: action.payload };
    case types.GETEXAMS:
      return { ...state, exams: action.payload };
    case types.DELETECOURSE:
      return {
        ...state,
      };
    //03251509041-sheraz /;
    case types.GETALLTEACHER:
      return { ...state, teachers: action.payload };
    default:
      return state;
  }
};
export default courseReducer;
