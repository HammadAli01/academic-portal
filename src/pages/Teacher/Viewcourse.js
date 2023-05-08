import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Customtable } from "../../components/Customtable";
//import { Navbar } from "../../components/Navbar";
import { courseColumn, teacherSidebar } from "../../data";
import { useParams } from "react-router-dom";
import { getClass, getClasses } from "../../redux/actions/classesAction";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../redux/actions/Actions";
import { getCourse } from "../../redux/actions/courseAction";
import { Sidebar } from "../../components/Sidebar";
export const Viewcourse = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const navigate = useNavigate();
  //const { user } = useSelector((state) => state.user);
  const { classes } = useSelector((state) => state.class);
  const handleView = (item) => {
    // dispatch(getUsers("student"));
    // dispatch(getCourse(courseId));
    // dispatch(getClass(item.id));
    navigate(`viewClass/${item.id}`);
  };
  useEffect(() => {
    dispatch(getClasses(courseId));
  }, []);
  useEffect(() => {
    if (classes.length) {
      const Data = classes.map((item, ind) => {
        return {
          ...item,
          presentStudents: item?.studentsIds?.length ?? 0,
          serialNo: ind + 1,
        };
      });
      setData(Data);
    }
  }, [classes]);
  const handleAttendance = () => {
    //dispatch(getCourse(courseId));
    navigate("addattendance");
  };
  const handleQuiz = () => {
    navigate("takeQuiz");
  };
  return (
    <div>
      <button className="route-button" onClick={handleAttendance}>
        Take Attendance
      </button>
      <button className="route-button" onClick={handleQuiz}>
        Take Quiz
      </button>
      <h1 style={{ width: "100%", display: "grid" }}>Classes</h1>
      <Customtable headers={courseColumn} data={data} handleView={handleView} />
    </div>
  );
};
