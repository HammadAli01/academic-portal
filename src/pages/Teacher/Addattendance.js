import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
//import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { teacherSidebar } from "../../data";
import { getUsers } from "../../redux/actions/Actions";
import { AddClass, getClasses } from "../../redux/actions/classesAction";

import { getCourse } from "../../redux/actions/courseAction";
export const Addattendance = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();
  const [presentIds, setpresentIds] = useState([]);
  const { users } = useSelector((state) => state.user);
  const [students, setStudents] = useState([]);
  const current = new Date();
  const [error, setError] = useState("");
  const tempMonth = current.getMonth() + 1;
  const currentMonth = tempMonth < 10 ? `0${tempMonth}` : tempMonth;
  console.log(currentMonth);
  const currentDate = `${current.getFullYear()}-${currentMonth}-${current.getDate()}`;
  const { classes } = useSelector((state) => state.class);
  console.log(currentDate);
  const [dateSelected, setDateSelected] = useState(currentDate);
  const { courseSelected } = useSelector((state) => state.course);
  const handleChangeAttendance = (id, action) => {
    if (action === "present") {
      setpresentIds((state) => state.filter((item) => item !== id));
    } else {
      setpresentIds((state) => [...state, id]);
    }
  };
  const handleSave = () => {
    if (topic.length <= 0) {
      setError("Topic name is required");
    } else {
      const todayClass = {
        topic,
        date: dateSelected,
        courseId: Number(courseId),
        studentsIds: presentIds,
      };

      dispatch(getClasses(courseId));
      let res = classes.filter((item) => {
        return (
          item?.topic === todayClass.topic && item?.date === todayClass.date
        );
      });

      if (res.length <= 0) {
        setError("");
        dispatch(AddClass(todayClass, courseSelected));
        navigate(`/teacherDashboard/viewCourse/${courseId}`);
      } else {
        setError("Class already taken");
      }
    }
  };
  useEffect(() => {
    dispatch(getUsers("student"));
    // console.log(users);
  }, []);
  useEffect(() => {
    dispatch(getCourse(courseId));
  }, [courseId]);
  useEffect(() => {
    console.log("in USEEFFECT ", users, courseSelected);

    const data = users.filter((user) => {
      return courseSelected.studentIds.includes(user.id);
    });
    console.log("data is", data);
    setStudents(data);
  }, [courseSelected]);
  useEffect(() => {
    const data = students.map((student) => {
      return student.id;
    });
    setpresentIds(data);
  }, [students]);
  return (
    <div>
      <div className="topic">
        <input
          className="topicname"
          placeholder="Enter class topic"
          value={topic}
          onChange={(e) => {
            setTopic(e.target.value);
          }}
        />
        <label className="topic-error">{error}</label>
        <label htmlFor="date">Date:</label>
        <input
          className="topicdate"
          type="date"
          id="date"
          value={dateSelected}
          max={currentDate}
          onChange={(e) => {
            setDateSelected(e.target.value);
          }}
          name="date"
        ></input>
      </div>
      <table className="class-table add">
        <thead>
          <tr>
            <th>S/No</th>
            <th>Name</th>
            <th>Present</th>
            <th>Absent</th>
          </tr>
        </thead>
        <tbody>
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
