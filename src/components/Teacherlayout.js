import React, { useEffect } from "react";
import { Genericnavbar } from "./Genericnavbar";
import { teacherSidebar } from "../data";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
export const Teacherlayout = ({ component }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.localStorage.getItem("role") !== "teacher") {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Genericnavbar />
      <Sidebar data={teacherSidebar} />
      {component}
    </>
  );
};
