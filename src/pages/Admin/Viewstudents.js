import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { adminSidebar } from "../../data";
import { getUsers } from "../../redux/actions/Actions";

export const Viewstudents = () => {
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers("student"));
  }, []);
  return (
    <div>
      <table className="class-table ">
        <thead>
          <tr>
            <th>S/No</th>
            <th>name</th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>
          {users?.length >= 0
            ? users.map((element, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <th>{element?.username}</th>
                    <th>{element?.email}</th>
                  </tr>
                );
              })
            : "No Quizes Found"}
        </tbody>
      </table>
    </div>
  );
};
