import React, { useState, useEffect } from "react";
//import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { studentSidebar } from "../../data";
import { useSelector, useDispatch } from "react-redux";
import {
  addLeaveRequest,
  getAllCourses,
} from "../../redux/actions/courseAction";
import "../../styles/teacherdashboard.css";
export const LeaveRequest = () => {
  const { courses } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.user);
  const [registered, setRegistered] = useState([]);

  const current = new Date();
  const dispatch = useDispatch();
  //const [error, setError] = useState("");
  const tempMonth = current.getMonth() + 1;
  const currentMonth = tempMonth < 10 ? `0${tempMonth}` : tempMonth;
  const currentDate = `${current.getFullYear()}-${currentMonth}-${
    current.getDate() + 1
  }`;
  const [leaveData, setleaveData] = useState({
    dateSelected: currentDate,
    courseSelected: { name: "Select Course" },
    reason: "",
  });
  const handleSave = () => {
    if (
      leaveData.courseSelected.name !== "Select Course" ||
      leaveData.reason.length > 0
    ) {
      dispatch(
        addLeaveRequest({
          ...leaveData,
          student: { name: user.username, id: user.id },
          status: "Teacher Approval",
        })
      );
      setleaveData({
        dateSelected: currentDate,
        courseSelected: { name: "Select Course" },
        reason: "",
      });
    } else {
      alert("Kindly select teacher and enter reason for leave");
    }
  };
  const inputhandler = (e) => {
    setleaveData((state) => ({ ...state, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    dispatch(getAllCourses());
  }, []);
  useEffect(() => {
    if (courses.length > 0) {
      let result = courses.filter((course) =>
        course?.studentIds?.includes(user.id)
      );
      //console.log("RESULT IS ", result, user.id);
      setRegistered(result);
    }
  }, [courses]);
  return (
    <div>
      <div className="leave-section">
        <div className="leave-dropdown dropdown">
          <button className="leave-dropbtn dropbtn">
            {leaveData.courseSelected?.name}
          </button>
          <div className="leave-content dropdown-content">
            {courses.length > 0 ? (
              courses.map((course) => {
                let res = course.studentIds.includes(user.id);
                if (res === true) {
                  return (
                    <a
                      name="courseSelected"
                      onClick={() => {
                        inputhandler({
                          target: {
                            name: "courseSelected",
                            value: { name: course.name, id: course.id },
                          },
                        });
                      }}
                      value={course}
                    >
                      {course.name}
                    </a>
                  );
                }
              })
            ) : (
              <h3>No Courses found</h3>
            )}
          </div>
        </div>

        <input
          className="leavedate"
          type="date"
          id="date"
          value={leaveData.dateSelected}
          min={currentDate}
          onChange={(e) => {
            inputhandler(e);
          }}
          name="dateSelected"
        ></input>

        <textarea
          id="reason"
          placeholder="Enter the reason for leave"
          className="leavereason"
          type="textarea"
          value={leaveData.reason}
          name="reason"
          onChange={(e) => {
            inputhandler(e);
          }}
          rows="4"
          cols="50"
        />
        <button
          className="submitLeave"
          onClick={() => {
            handleSave();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
