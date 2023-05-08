import React, { useState } from "react";
import "../../styles/admindashboard.css";
//import { Navbar } from "../../components/Navbar";
import { getUsers, registerUser } from "../../redux/actions/Actions";
import { useDispatch } from "react-redux";
import { getAllCourses } from "../../redux/actions/courseAction";
import { Sidebar } from "../../components/Sidebar";
import { adminSidebar } from "../../data";
export const Addstudent = () => {
  const initialState = {
    username: "",
    email: "",
    password: "",
    role: "student",
  };
  const dispatch = useDispatch();
  const [studentData, setStudentData] = useState(initialState);
  const handleChange = (e) => {
    setStudentData((state) => {
      return {
        ...state,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(studentData);
    dispatch(registerUser(studentData));
    dispatch(getUsers("student"));
  };
  return (
    <div>
      <h3 className="head">Student Registration Form</h3>
      <form className="student-form" onSubmit={handleSubmit}>
        <div className="form__group field">
          <input
            type="input"
            className="form__field"
            placeholder="Name"
            name="username"
            value={studentData.username}
            id="username"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />
          <label for="username" className="form__label">
            Enter Username
          </label>
        </div>
        <div className="form__group field">
          <input
            type="input"
            className="form__field"
            placeholder="Email"
            name="email"
            id="email"
            onChange={(e) => {
              handleChange(e);
            }}
            required
            value={studentData.email}
          />
          <label for="email" className="form__label">
            Enter Email
          </label>
        </div>
        <div className="form__group field">
          <input
            type="input"
            className="form__field"
            placeholder="Enter Password"
            name="password"
            onChange={(e) => {
              handleChange(e);
            }}
            id="password"
            value={studentData.password}
            required
          />
          <label for="password" className="form__label">
            Enter Password
          </label>
        </div>
        <button className="button-28" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
