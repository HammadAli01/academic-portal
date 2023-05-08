import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
//import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { studentSidebar } from "../../data";
import { getClasses } from "../../redux/actions/classesAction";

export const Studentclasses = () => {
  const { courseId } = useParams();
  const { classes } = useSelector((state) => state.class);
  const { user } = useSelector((state) => state.user);
  const [allClasses, setAllClasses] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClasses(courseId));
  }, [courseId]);
  useEffect(() => {
    setAllClasses(classes);
  }, [classes]);
  return (
    <div>
      <h3 className="head">Attendance</h3>
      <table className="class-table ">
        <thead>
          <tr>
            <th>S/No</th>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {allClasses.length > 0
            ? allClasses.map((element, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <th>{element?.topic}</th>
                    <th>{element?.date}</th>
                    {element?.studentsIds?.includes(user.id) ? (
                      <th>Present</th>
                    ) : (
                      <th>Absent</th>
                    )}
                  </tr>
                );
              })
            : "No Classes Found"}
        </tbody>
      </table>
    </div>
  );
};
