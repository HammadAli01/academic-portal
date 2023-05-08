import React, { useState } from "react";
import { signupSchema } from "../data";
import { Link, useNavigate } from "react-router-dom";
import "../styles/registration.css";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/actions/Actions";
export const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [userData, setuserData] = useState({
    username: "",
    email: "",
    password: "",
    role: "teacher",
  });
  const handleInputChange = (e) => {
    setuserData((userData) => ({
      ...userData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    if (
      userData.username.trim().length > 0 &&
      userData.email.trim().length > 0 &&
      userData.password.trim().length > 0
    ) {
      if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userData.email)) {
        e.preventDefault();
        dispatch(registerUser(userData));
        navigate("/");
        console.log(userData);
      } else {
        e.preventDefault();
        setError("Invalid email address");
      }
    } else {
      e.preventDefault();
      setError("Enter all details");
    }
  };
  return (
    <div className="registerdiv">
      <div className="self-container">
        <form className="form" onSubmit={handleSubmit}>
          <h2>SIGN UP</h2>
          {signupSchema.map((field) => (
            <input
              className="box"
              placeholder={field.placeholder}
              name={field.name}
              type={field.type}
              onChange={(e) => handleInputChange(e)}
            />
          ))}
          <div className="radio">
            <label>
              <input
                type="radio"
                name="role"
                value="teacher"
                checked={userData.role === "teacher"}
                onChange={(e) => handleInputChange(e)}
              />
              Teacher
            </label>
            <label>
              <input
                name="role"
                type="radio"
                value="Admin"
                checked={userData.role === "Admin"}
                onChange={(e) => handleInputChange(e)}
              />
              Admin
            </label>
            <label className="error">{error}</label>
          </div>
          <button type="submit" id="submit" onClick={(e) => handleSubmit(e)}>
            Submit
          </button>
          <Link to="/" className="router-link">
            Signin
          </Link>
        </form>
      </div>
    </div>
  );
};
