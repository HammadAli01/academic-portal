import * as types from "../Action-type";
import axios from "axios";
const coursesGetting = (gotCourses) => ({
  type: types.GETCOURSES,
  payload: gotCourses,
});
const AllcoursesGetting = (gotCourses) => ({
  type: types.GETALLCOURSES,
  payload: gotCourses,
});
const courseAdding = () => ({
  type: types.ADDCOURSES,
});
const teacherGet = (user) => ({
  type: types.GETTEACHER,
  payload: user,
});
const courseDelete = () => ({
  type: types.DELETECOURSE,
});
const teacherAllGet = (teachers) => ({
  type: types.GETALLTEACHER,
  payload: teachers,
});
const courseUpdate = () => ({
  type: types.UPDATECOURSE,
});
const courseGet = (gotCourse) => ({
  type: types.GETCOURSE,
  payload: gotCourse,
});
const requestsGet = (gotRequests) => ({
  type: types.GETREQUESTS,
  payload: gotRequests,
});
const QuizessGet = (gotQuizes) => ({
  type: types.GETQUIZES,
  payload: gotQuizes,
});
const QuizGet = (gotQuiz) => ({
  type: types.GETQUIZ,
  payload: gotQuiz,
});
const examGet = (gotExams) => ({
  type: types.GETEXAMS,
  payload: gotExams,
});
export const updateCourse = (course) => {
  return async function (dispatch) {
    const response = await axios.patch(
      `${process.env.REACT_APP_API}/courses/${course.id}`,
      {
        name: course.name,
        teacherName: course.teacherName,
        teacherId: course.teacherId,
      }
    );

    dispatch(courseUpdate());
    dispatch(getAllCourses());
    const requestsResponse = await axios.get(
      `${process.env.REACT_APP_API}/leaveRequests/?courseSelected.id=${course.id}`
    );
    console.log("response got is -->", requestsResponse.data);
    requestsResponse.data.forEach(async (element) => {
      const updateRequest = await axios.patch(
        `${process.env.REACT_APP_API}/leaveRequests/${element.id}`,
        {
          courseSelected: {
            name: course.name,
            teacherId: course.teacherId,
            id: course.id,
          },
        }
      );
    });
  };
};
export const getCourses = (id) => {
  return async function (dispatch) {
    console.log("id in courseaction is => ", id);
    const response = await axios.get(
      `${process.env.REACT_APP_API}/courses/?teacherId=${id}`
    );
    console.log("response got is ", response.data);
    dispatch(coursesGetting(response.data));
  };
};
export const getAllCourses = () => {
  return async function (dispatch) {
    const response = await axios.get(`${process.env.REACT_APP_API}/courses`);
    console.log("response got is by getting all courses", response.data);
    dispatch(AllcoursesGetting(response.data));
  };
};
export const getStudentAllCourses = (id) => {
  return async function (dispatch) {
    const response = await axios.get(`${process.env.REACT_APP_API}/courses`);
    let res = response.data.filter((item) => item.studentIds.includes(id));
    console.log(`Student with id ${id} have courses `, res);
    dispatch(AllcoursesGetting(res));
  };
};
export const AddCourse = (course) => {
  return async function (dispatch) {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/courses`,
      course
    );
    console.log("response got is ", response.data);
    dispatch(courseAdding());
    dispatch(getAllCourses());
  };
};
export const getTeacher = (id) => {
  return async function (dispatch) {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/users/id=${id}`
    );
    console.log("response got is ", response.data);
    dispatch(teacherGet(response.data));
  };
};
export const getAllTeacher = () => {
  return async function (dispatch) {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/users/?role=teacher`
    );
    console.log("Teacher got from server are", response);
    dispatch(teacherAllGet(response.data));
  };
};
export const deleteCourse = (id) => {
  return async function (dispatch) {
    const response = await axios.delete(
      `${process.env.REACT_APP_API}/courses/${id}`
    );
    console.log("response got by deleting course is  ", response.data);
    dispatch(courseDelete());
  };
};

export const getCourse = (id) => {
  return async function (dispatch) {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/courses/${id}`
    );
    console.log("response got by getting single course is  ", response.data);
    dispatch(courseGet(response.data));
  };
};
export const updateCourseStudents = (id, stud) => {
  return async function (dispatch) {
    console.log("Data OF PATCH  ", id, stud);
    const response = await axios.patch(
      `${process.env.REACT_APP_API}/courses/${id}`,
      { studentIds: stud }
    );
  };
};
export const unRegisterStudent = (courseId, studentIds) => {
  return async function (dispatch) {
    const response = await axios.patch(
      `${process.env.REACT_APP_API}/courses/${courseId}`,
      { studentIds: studentIds }
    );
    dispatch(getCourse(courseId));
  };
};
export const addLeaveRequest = (request) => {
  return async function (dispatch) {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/leaveRequests`,
      request
    );
  };
};
export const getLeaveRequest = (optionOne, optionTwo) => {
  return async function (dispatch) {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/leaveRequests/?status=${optionOne}`
    );
    console.log("res1 is ", response.data);
    if (optionOne !== optionTwo) {
      const response2 = await axios.get(
        `${process.env.REACT_APP_API}/leaveRequests/?status=${optionTwo}`
      );
      dispatch(requestsGet([...response.data, ...response2.data]));
    } else {
      dispatch(requestsGet(response.data));
    }
  };
};
export const getStudentLeaveRequest = (id) => {
  return async function (dispatch) {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/leaveRequests/?student.id=${id}`
    );
    console.log("student requests are ", response.data);
    dispatch(requestsGet(response.data));
  };
};
export const deleteLeaveRequest = (id, userid) => {
  return async function (dispatch) {
    const response = await axios.delete(
      `${process.env.REACT_APP_API}/leaveRequests/${id}`
    );
    dispatch(getStudentLeaveRequest(userid));
  };
};
export const updateLeaveRequest = (id, status, handleGetRequest) => {
  return async function (dispatch) {
    const response = await axios.patch(
      `${process.env.REACT_APP_API}/leaveRequests/${id}`,
      { status: status }
    );
    handleGetRequest();
    //dispatch(getLeaveRequest());
  };
};
export const editLeaveRequest = (id, body) => {
  return async function (dispatch) {
    const response = await axios.put(
      `${process.env.REACT_APP_API}/leaveRequests/${id}`,
      body
    );

    //dispatch(getLeaveRequest());
  };
};
export const getAllQuizes = () => {
  return async function (dispatch) {
    const response = await axios.get(`${process.env.REACT_APP_API}/quiz`);

    dispatch(QuizessGet(response.data));
  };
};
export const addQuiz = (quiz) => {
  return async function (dispatch) {
    console.log(quiz);
    const response = await axios.post(
      `${process.env.REACT_APP_API}/quiz`,
      quiz
    );
    //  dispatch(QuizessGet(response.data));
  };
};
export const getQuiz = (id) => {
  return async function (dispatch) {
    const response = await axios.get(`${process.env.REACT_APP_API}/quiz/${id}`);
    console.log("Got quiz is ", response.data);
    dispatch(QuizGet(response.data));
  };
};
export const addExam = (exam) => {
  return async function (dispatch) {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/exam`,
      exam
    );
    console.log("Got res by adding exam is ", response.data);
    dispatch(getExam());
    // dispatch(QuizGet(response.data));
  };
};
export const getExam = () => {
  return async function (dispatch) {
    const response = await axios.get(`${process.env.REACT_APP_API}/exam`);
    console.log("Got res by getting exams is ", response.data);
    dispatch(examGet(response.data));
  };
};
export const updateExam = (id, exam) => {
  return async function (dispatch) {
    const response = await axios.put(
      `${process.env.REACT_APP_API}/exam/${id}`,
      exam
    );
    dispatch(getExam());
    console.log("Got res by updating exams is ", response.data);
  };
};
export const bookExam = (id, property, dateData) => {
  return async function (dispatch) {
    const response = await axios.patch(
      `${process.env.REACT_APP_API}/exam/${id}`,
      { [property]: dateData }
    );
    //dispatch(getExam());
    console.log("Got res by updating exams is ", response.data);
  };
};
export const adminUpdateCourseStatus = (id, courseStatus) => {
  return async function (dispatch) {
    const response = await axios.patch(
      `${process.env.REACT_APP_API}/courses/${id}`,
      { status: courseStatus }
    );
    console.log("Got res by updating course is ", response.data);
    dispatch(getCourse(id));
  };
};
