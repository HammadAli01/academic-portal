import React, { useEffect } from "react";
import { Genericnavbar } from "./Genericnavbar";
import { adminSidebar } from "../data";
import { Sidebar } from "./Sidebar";
import { useNavigate } from "react-router-dom";
export const Layout = ({ component }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.localStorage.getItem("role") !== "admin") {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Genericnavbar />
      <Sidebar data={adminSidebar} />
      {component}
    </>
  );
};
