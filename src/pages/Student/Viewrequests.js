import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Customtable } from "../../components/Customtable";
import { Leavemodal } from "../../components/Leavemodal";
//import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import {
  requestsstatus,
  studentRequestheader,
  studentSidebar,
} from "../../data";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  addLeaveRequest,
  deleteLeaveRequest,
  editLeaveRequest,
  getLeaveRequest,
  getStudentAllCourses,
  getStudentLeaveRequest,
} from "../../redux/actions/courseAction";
export const Viewrequests = () => {
  //const [showAbstract, setShowAbstract] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { requests, courses } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.user);
  const [userRequests, setRequests] = useState([]);
  const dispatch = useDispatch();
  const [dataUpdate, setDataUpdate] = useState(false);
  const [error, setError] = useState("");
  const [studentCourses, setStudentCourses] = useState([]);
  const initialRequest = {
    name: "",
    date: "",
    reason: "",
  };
  const [studentRequest, setStudentRequest] = useState(initialRequest);
  const userRequestHandler = (e) => {
    setStudentRequest((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };
  const addRequestHandler = () => {
    setError("");
    setStudentRequest(initialRequest);
    dispatch(getStudentAllCourses(user.id));

    //setStudentCourses([obj, ...studentCourses]);
    handleShow();
  };
  const handleDelete = (item) => {
    dispatch(deleteLeaveRequest(item.id, user.id));
  };
  const handleUpdateData = (selectedCourse) => {
    if (
      studentRequest.reason.trim().length > 0 &&
      selectedCourse.name !== "Select course"
    ) {
      if (dataUpdate === true) {
        // alert("updated data is ");
        dispatch(
          editLeaveRequest(studentRequest.id, {
            reason: studentRequest.reason,
            dateSelected: studentRequest.date,
            courseSelected: {
              id: selectedCourse.id,
              name: selectedCourse.name,
              teacherId: selectedCourse.teacherId,
            },
            student: { name: user.username, id: user.id },
            status: "Teacher Approval",
          })
        );
        setStudentRequest(initialRequest);
        dispatch(getStudentLeaveRequest(user.id));
        handleClose();
      } else {
        console.log("new data is ", studentRequest);
        dispatch(
          addLeaveRequest({
            reason: studentRequest.reason,
            dateSelected: studentRequest.date,
            courseSelected: {
              id: selectedCourse.id,
              name: selectedCourse.name,
              teacherId: selectedCourse.teacherId,
            },
            student: { name: user.username, id: user.id },
            status: "Teacher Approval",
          })
        );
        setStudentRequest(initialRequest);
        dispatch(getStudentLeaveRequest(user.id));
        handleClose();
      }
    } else {
      setError("Kindly input correct data");
    }
  };
  const handleEdit = (item) => {
    setError("");
    const res = requestsstatus.includes(item.status);
    if (res == false) {
      //alert("can be updated");
      dispatch(getStudentAllCourses(user.id));
      setStudentRequest(item);
      handleShow();
      setDataUpdate(true);
    } else {
      alert("cannot be updated because it is in progress");
    }
  };
  useEffect(() => {
    if (requests.length) {
      const data = requests.map((item, ind) => {
        return {
          id: item.id,
          serialNo: ind + 1,
          name: item.courseSelected.name,
          date: item.dateSelected,
          reason: item.reason,
          status: item.status,
        };
      });
      setRequests(data);
    } else setRequests([]);
  }, [requests]);
  useEffect(() => {
    dispatch(getStudentLeaveRequest(user.id));
  }, []);
  useEffect(() => {
    // let obj = {
    //   id: 0,
    //   name: "Select Course",
    //   teacherId: 0,
    // };
    //setStudentCourses([obj, ...courses]);
    setStudentCourses(courses);
  }, [courses]);

  return (
    <div>
      <h3 className="head">Leave Requests</h3>
      <Button
        className="examaddbutton"
        variant="success"
        onClick={() => addRequestHandler()}
      >
        Add Request
      </Button>

      <Customtable
        headers={studentRequestheader}
        data={userRequests}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
      {show && (
        <>
          <Leavemodal
            studentRequest={studentRequest}
            userRequestHandler={userRequestHandler}
            show={show}
            error={error}
            handleClose={handleClose}
            handleUpdateData={handleUpdateData}
            studentCourses={studentCourses}
          />
        </>
      )}
      {/* <table className="class-table ">
        <thead>
          <tr>
            <th>S/No</th>
            <th>Course</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userRequests.length > 0
            ? userRequests.map((element, index) => {
                if (element.student.id === user.id) {
                  return (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <th>{element?.courseSelected?.name}</th>
                      <th>{element?.dateSelected}</th>
                      <th>{element?.status}</th>
                      <th>
                        <button
                          onClick={() => {
                            handleDelete(element.id);
                          }}
                        >
                          Delete
                        </button>
                      </th>
                    </tr>
                  );
                }
              })
            : "No Requests Found"}
        </tbody>
      </table> */}
    </div>
  );
};
