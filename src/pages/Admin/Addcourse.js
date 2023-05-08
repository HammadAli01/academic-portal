import React, { useEffect, useState } from "react";
import "../../styles/managecourse.css";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../redux/actions/Actions";
import { AddCourse, getAllCourses } from "../../redux/actions/courseAction";
export const Addcourse = () => {
  const initialState = {
    name: "",

    classes: 0,
    studentIds: [],
    teacherId: 0,
    teacherName: "",
  };
  const initalTeacherSelected = {
    id: 0,
    username: "Select Teacher",
  };
  const [teacherSelected, setTeacherSelected] = useState(initalTeacherSelected);
  const [teachers, setTeachers] = useState([]);
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [course, setCourse] = useState(initialState);
  const handleChange = (e) => {
    setCourse((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };
  const handleCourseSubmit = () => {
    if (teacherSelected.id !== 0 && course.name) {
      course.teacherId = teacherSelected.id;
      course.teacherName = teacherSelected.username;
      dispatch(AddCourse(course));
      dispatch(getAllCourses());
      setTeacherSelected(initalTeacherSelected);
      setCourse(initialState);
    } else {
      alert("Kindly enter course name and select teacher. ");
    }
  };
  const handleBlur = (e) => {
    if (e.target.value.trim().length <= 0) {
    }
  };
  useEffect(() => {
    dispatch(getUsers("teacher"));
  }, []);
  useEffect(() => {
    setTeachers(users);
    console.log("teachers in added are: ", teachers);
  }, [users]);
  return (
    <div className="addcourse">
      <input
        className="course_field"
        value={course.name}
        name="name"
        placeholder="Enter course name"
        onChange={(e) => handleChange(e)}
        onBlur={(e) => {
          handleBlur(e);
        }}
      />
      <div class="dropdown">
        <button class="dropbtn">{teacherSelected.username}</button>
        <div class="dropdown-content">
          {teachers.length > 0 ? (
            teachers.map((teacher) => (
              <a
                onClick={() => {
                  setTeacherSelected({
                    id: teacher.id,
                    username: teacher.username,
                  });
                }}
              >
                {teacher.username}
              </a>
            ))
          ) : (
            <h3>No teachers found</h3>
          )}
        </div>
      </div>
      <button
        onClick={() => {
          handleCourseSubmit();
        }}
        class="button-68 course-submit"
      >
        Add Course
      </button>
    </div>
  );
};
