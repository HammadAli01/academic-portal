import React, { useState, useEffect } from "react";
import "../../styles/teacherdashboard.css";
//import { Navbar } from "../../components/Navbar";
import { Table } from "../../components/Table";
import { Customtable } from "../../components/Customtable";
import { teacherColumn, teacherSidebar } from "../../data";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../redux/actions/courseAction";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
export const TeacherDashboard = () => {
  const { user } = useSelector((state) => state.user);
  const { courses } = useSelector((state) => state.course);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleView = (item) => {
    navigate(`viewCourse/${item.id}`);
  };
  useEffect(() => {
    dispatch(getCourses(user.id));
  }, []);
  useEffect(() => {
    if (courses.length) {
      const Data = courses
        .filter((item) => item.status !== "InActive")
        .map((item, ind) => {
          return {
            ...item,
            totalStudents: item?.studentIds?.length ?? 0,
            serialNo: ind + 1,
          };
        });
      setData(Data);
    }
  }, [courses]);
  return (
    <div>
      <h3 className="head">Courses</h3>
      <Customtable
        headers={teacherColumn}
        data={data || []}
        handleView={handleView}
      />
    </div>
  );
};
