import React, { useState, useEffect } from "react";
//import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { teacherSidebar } from "../../data";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions/Actions";
import {
  addQuiz,
  addQuizes,
  getCourse,
} from "../../redux/actions/courseAction";
export const Takequiz = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();
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
  const [inputs, setInputs] = useState([]);
  const handleSave = () => {
    setError("");
    //topic,date,students[id,name,marks]
    if (topic.trim().length > 0) {
      let res = students.map((student) => {
        return {
          id: student.id,
          username: student.name,
          marks: student.marks,
        };
      });
      dispatch(
        addQuiz({
          courseId: courseId,
          courseName: courseSelected.name,
          topic,
          dateSelected,
          res,
        })
      );
      navigate(`/teacherDashboard/viewCourse/${courseId}`);
    } else {
      setError("Class Topic is required");
    }
  };

  useEffect(() => {
    dispatch(getUsers("student"));
  }, []);
  useEffect(() => {
    dispatch(getCourse(courseId));
  }, [courseId]);
  useEffect(() => {
    console.log("in USEEFFECT ", users, courseSelected);

    const data = users.filter((user) => {
      return courseSelected?.studentIds?.includes(user.id);
    });
    const tempdata = data?.map((item, ind) => {
      return {
        ...item,
        marks: 0,
      };
    });

    // console.log("data is", data);
    setStudents(tempdata);
  }, [courseSelected]);
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
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0
            ? students.map((student, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <th>{student?.username}</th>
                    <th>
                      <input
                        type="number"
                        max={1}
                        name="marks"
                        value={student.marks}
                        onChange={(e) => {
                          setStudents((state) =>
                            state.map((item) => {
                              if (item === student) {
                                return {
                                  ...item,
                                  ["marks"]: e.target.value,
                                };
                              } else {
                                return item;
                              }
                            })
                          );
                        }}
                      />
                    </th>
                  </tr>
                );
              })
            : "No data found"}
        </tbody>
      </table>
      <button
        onClick={() => {
          handleSave();
        }}
        className="saveButton"
      >
        Save
      </button>
    </div>
  );
};
// [state[state.indexOf(student)].marks]:
//                                 e.target.value,
