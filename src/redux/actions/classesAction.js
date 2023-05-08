import * as types from "../Action-type";
import axios from "axios";
// const teacherGet = () => ({
//   type: types.GETTEACHER,
// });
// export const getTeacher = (id) => {
//   return async function (dispatch) {
//     const response = await axios.get(
//       `${process.env.REACT_APP_API}/users/?id=${id}`
//     );
//     console.log("response got is ", response.data);
//     dispatch(coursesGetting(response.data));
//   };
// };
const classesGet = (gotClasses) => ({
  type: types.GETCLASSES,
  gotClasses,
});
const classGet = (gotClass) => ({
  type: types.GETCLASS,
  gotClass,
});
export const getClasses = (id) => {
  return async function (dispatch) {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/classes/?courseId=${id}`
    );
    console.log(
      "response got by getting classes of teacher is ",
      response.data
    );
    dispatch(classesGet(response.data));
  };
};
export const AddClass = (payload, courseSelected) => {
  return async function (dispatch) {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/classes/`,
      payload
    );

    const response2 = await axios.patch(
      `${process.env.REACT_APP_API}/courses/${courseSelected.id}`,
      { classes: courseSelected.classes + 1 }
    );
    console.log("response got by adding class of course is ", response.data);
    // dispatch(classUpdate(response.data));
  };
};

export const getClass = (id) => {
  return async function (dispatch) {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/classes/${id}`
    );
    console.log("response got by getting class of course is ", response.data);
    dispatch(classGet(response.data));
  };
};
export const updateClass = (list, id) => {
  return async function (dispatch) {
    const response = await axios.patch(
      `${process.env.REACT_APP_API}/classes/${id}`,
      { studentsIds: list }
    );
    console.log("response got by updating class of course is ", response.data);
    // dispatch(classUpdate(response.data));
  };
};
