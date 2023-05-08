import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Customtable } from "../../components/Customtable";
import { adminCourseManage } from "../../data";
import { getUsers } from "../../redux/actions/Actions";
import {
  adminUpdateCourseStatus,
  getCourse,
  unRegisterStudent,
} from "../../redux/actions/courseAction";
export const CourseRegister = () => {
  const { courseId } = useParams();
  const { courseSelected } = useSelector((state) => state.course);
  const { users } = useSelector((state) => state.user);
  const [students, setStudents] = useState([]);

  const dispatch = useDispatch();
  const handleUnregister = (student) => {
    const data = students
      .filter((element) => element.id !== student.id)
      .map((element) => element.id);
    dispatch(unRegisterStudent(courseId, data));
  };
  const updateCourseStatus = (updatedStatus) => {
    dispatch(adminUpdateCourseStatus(courseId, updatedStatus));
  };
  useEffect(() => {
    dispatch(getUsers("student"));
  }, []);

  useEffect(() => {
    setStudents(users);
  }, [users]);
  useEffect(() => {
    dispatch(getCourse(courseId));
  }, [courseId]);
  useEffect(() => {
    const data = users
      .filter((user) => {
        return courseSelected.studentIds.includes(user.id);
      })
      .map((user, index) => {
        return {
          ...user,
          serialNo: index + 1,
          status: "registered",
        };
      });
    console.log("data is", data);
    setStudents(data);
  }, [courseSelected]);
  return (
    <div>
      <div className="status-span">
        <h6
          style={{
            display: "inline-flex",
            marginTop: "15px",
            marginLeft: "-20px",
          }}
        >
          Course Status :{" "}
        </h6>
        <p style={{ display: "inline-flex", marginLeft: "20px" }}>
          {courseSelected?.status}
        </p>
        {courseSelected?.status == "Active" ? (
          <Button
            className="coursenameaddbutton"
            onClick={() => {
              updateCourseStatus("InActive");
            }}
          >
            Make Inactive
          </Button>
        ) : (
          <Button
            className="coursenameaddbutton"
            onClick={() => {
              updateCourseStatus("Active");
            }}
          >
            Make Active
          </Button>
        )}
      </div>
      <Customtable
        headers={adminCourseManage}
        data={students}
        handleUnregister={handleUnregister}
      />
    </div>
  );
};
