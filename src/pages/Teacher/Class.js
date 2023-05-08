import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions/Actions";
import { getClass, updateClass } from "../../redux/actions/classesAction";
import "../../styles/teacherdashboard.css";
//import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { getCourse } from "../../redux/actions/courseAction";
import { teacherSidebar } from "../../data";
export const Class = () => {
  const { classId, courseId } = useParams();
  const [students, setStudents] = useState([]);
  const { users } = useSelector((state) => state.user);
  const { selectedClass } = useSelector((state) => state.class);
  const [presentIds, setpresentIds] = useState([]);
  const { courseSelected } = useSelector((state) => state.course);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChangeAttendance = (id, action) => {
    if (action === "present") {
      setpresentIds((state) => state.filter((item) => item !== id));
    } else {
      setpresentIds((state) => [...state, id]);
    }
  };
  const handleSave = () => {
    //update ids of present students
    dispatch(updateClass(presentIds, classId));
    navigate(`/teacherDashboard/viewCourse/${courseId}`);
  };

  useEffect(() => {
    dispatch(getUsers("student"));
    // console.log(users);
  }, []);
  useEffect(() => {
    dispatch(getCourse(courseId));
  }, [courseId]);
  useEffect(() => {
    dispatch(getClass(classId));
  }, [classId]);
  useEffect(() => {
    console.log("in USEEFFECT ", users, selectedClass, courseSelected);
    setpresentIds(selectedClass.studentsIds);
    const data = users.filter((user) => {
      return selectedClass?.studentsIds?.includes(user.id);
    });
    console.log("data is", data);
    setStudents(data);
  }, [selectedClass]);
  return (
    <div>
      <table className="class-table">
        <thead>
          <tr>
            <th>S/No</th>
            <th>Name</th>
            <th>Present</th>
            <th>Absent</th>
          </tr>
        </thead>
        <tbody>
          {console.log("students are ", students)}
          {students.length > 0
            ? students.map((student, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <th>{student?.username}</th>
                    {presentIds?.includes(student?.id) ? (
                      <th>Present</th>
                    ) : (
                      <th
                        onClick={() => {
                          handleChangeAttendance(student.id, "absent");
                        }}
                      >
                        Mark Present
                      </th>
                    )}
                    {presentIds?.includes(student.id) ? (
                      <th
                        onClick={() => {
                          handleChangeAttendance(student.id, "present");
                        }}
                      >
                        Mark Absent
                      </th>
                    ) : (
                      <th>Absent</th>
                    )}
                  </tr>
                );
              })
            : "No data found"}
        </tbody>
      </table>
      <button
        className="saveButton"
        onClick={() => {
          handleSave();
        }}
      >
        Save
      </button>
    </div>
  );
};
