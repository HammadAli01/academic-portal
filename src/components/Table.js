import React, { useEffect, useState } from "react";
import "../styles/table.css";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../redux/actions/courseAction";
import Store from "../redux/Store";
export const Table = () => {
  const [columns, setColumns] = useState([]);
  const [coursesList, setCourses] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { courses } = useSelector((state) => state.course);
  const [isUpdated, setIsUpdated] = useState(false);
  useEffect(() => {
    if (user.role === "teacher") {
      import("../data.json").then((module) => setColumns(module.teacherColumn));
      dispatch(getCourses(user.id));
      setIsUpdated(true);
    } else {
      import("../data.json").then((module) => setColumns(module.studentColumn));
    }
  }, []);
  useEffect(() => {
    if (isUpdated) {
      setCourses(courses);
    }
  }, [courses]);

  return (
    <table class="table">
      <tr>
        {columns.map((heading) => (
          <th>{heading}</th>
        ))}
        <th class="empty">Action</th>
      </tr>

      {coursesList.length > 0 ? (
        coursesList.map((course) => (
          <tr>
            <td>{course.id}</td>
            <td>{course.name}</td>
            <td>{course.totalStudents}</td>
            <td>{course.classes}</td>
            <td class="edit-buttons">
              <button class="edit">Edit</button>
              <button class="delete">Delete</button>
            </td>
          </tr>
        ))
      ) : (
        <h2>No courses registered</h2>
      )}
    </table>
  );
};
