import React, { useEffect } from "react";
import { Genericnavbar } from "./Genericnavbar";
import { studentSidebar } from "../data";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
export const Studentlayout = ({ component }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.localStorage.getItem("role") !== "student") {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Genericnavbar />
      <Sidebar data={studentSidebar} />
      {component}
    </>
  );
};
