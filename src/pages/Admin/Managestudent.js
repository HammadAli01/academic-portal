import React, { useEffect, useState } from "react";
//import { Customnavbar } from "../../components/Customnavbar";
import { Sidebar } from "../../components/Sidebar";
import "../../styles/manageStudents.css";
import { useNavigate } from "react-router-dom";
import { adminSidebar, AdminStudents } from "../../data";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  getUsers,
  registerUser,
  updateUser,
} from "../../redux/actions/Actions";
import { Customtable } from "../../components/Customtable";
import { Studentmodal } from "../../components/Studentmodal";

export const Managestudent = () => {
  const [show, setShow] = useState(false);
  const initialState = {
    username: "",
    email: "",
    password: "",
  };
  const [studentData, setStudentData] = useState(initialState);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.user);
  const [students, setStudents] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState();
  useEffect(() => {
    dispatch(getUsers("student"));
  }, []);
  useEffect(() => {
    const data = users.map((user, index) => {
      return {
        ...user,
        serialNo: index + 1,
      };
    });
    setStudents(data);
  }, [users]);
  const handleEdit = (student) => {
    setIsUpdate(true);
    setError("");
    setStudentData(student);
    handleShow();
  };
  const handleChange = (e) => {
    setStudentData((state) => {
      return {
        ...state,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleDelete = (student) => {};
  const handleSave = async () => {
    setError("");
    if (
      studentData.username.trim().length <= 0 ||
      studentData.email.trim().length <= 0 ||
      studentData.password.trim().length <= 0
    ) {
      setError("All input fields are required");
    } else {
      let res = await axios.get(
        `${process.env.REACT_APP_API}/users/?email=${studentData.email}`
      );
      console.log(res.data.length);
      if (res.data.length <= 0) {
        if (isUpdate == false) {
          dispatch(registerUser({ ...studentData, role: "student" }));
          dispatch(getUsers("student"));
          handleClose();
        } else {
          saveUpdatedUser();
        }
      } else {
        if (isUpdate == false) {
          alert("user with this email already exists");
        } else {
          if (res.data[0].id == studentData.id) {
            saveUpdatedUser();
          } else {
            alert("user with this email already exist");
          }
        }
      }
    }
  };
  const saveUpdatedUser = () => {
    dispatch(updateUser(studentData));
    dispatch(getUsers("student"));
    handleClose();
  };
  return (
    <div>
      <h3 className="head">Students</h3>

      <button
        onClick={() => {
          setStudentData(initialState);
          handleShow();
          setError("");
          setIsUpdate(false);
          // navigate("/admindashboard/managestudent/addstudent");
        }}
        className="button-68"
        role="button"
      >
        Add student
      </button>
      <Customtable
        headers={AdminStudents}
        data={students}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      {show && (
        <Studentmodal
          handleChange={handleChange}
          studentData={studentData}
          handleSave={handleSave}
          show={show}
          error={error}
          handleClose={handleClose}
        />
      )}
      {/* <table className="class-table ">
        <thead>
          <tr>
            <th>S/No</th>
            <th>name</th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>
          {users?.length >= 0
            ? users.map((element, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <th>{element?.username}</th>
                    <th>{element?.email}</th>
                  </tr>
                );
              })
            : "No Quizes Found"}
        </tbody>
      </table> */}
    </div>
  );
};
