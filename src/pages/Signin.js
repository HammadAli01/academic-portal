import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signinSchema } from "../data";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../redux/actions/Actions";
import "../styles/registration.css";
export const Signin = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  let initialState = {
    email: "",
    password: "",
  };
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const [dbUser, setdbUser] = useState(initialState);
  const [userData, setuserData] = useState(initialState);
  const [error, setError] = useState("");
  const { user } = useSelector((state) => state.user);
  const handleInputChange = (e) => {
    setuserData((userData) => ({
      ...userData,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    // alert("in login");

    if (isSubmitted) {
      if (user !== undefined) {
        console.log("user in sign in is ", user);
        if (user.password === userData.password) {
          setError("");
          localStorage.setItem("isLogin", true);
          localStorage.setItem("role", user.role);
          if (user.role === "admin") {
            navigate("/adminDashboard");
          } else if (user.role === "teacher") {
            navigate("/teacherdashboard");
          } else {
            navigate("/studentdashboard");
          }
        } else {
          setError("Password is incorrect");
        }
      } else {
        setError("Try signup first with this data");
      }
    }
  }, [user]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      userData.email.trim().length > 0 &&
      userData.password.trim().length > 0
    ) {
      setIsSubmitted(true);
      console.log("userData", userData);
      dispatch(loginUser(userData));
    } else {
      setError("All fields are required");
    }
  };

  return (
    <div className="registerdiv">
      <div className="self-container">
        <form className="form" onSubmit={handleSubmit}>
          <h2>SIGN IN</h2>
          {signinSchema.map((field) => (
            <input
              className="box"
              placeholder={field.placeholder}
              name={field.name}
              type={field.type}
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
          ))}
          <label className="error">{error}</label>
          <button type="submit" id="submit" onClick={(e) => handleSubmit(e)}>
            Submit
          </button>
          <Link to="/signup" className="router-link">
            Signup
          </Link>
        </form>
      </div>
    </div>
  );
};
