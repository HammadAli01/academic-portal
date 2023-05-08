import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const Protected = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // alert("login check");
    let login = localStorage.getItem("isLogin");
    if (!login) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
};
// {localStorage.getItem("isLogin") == true ? <component /> : navigate("/")}
