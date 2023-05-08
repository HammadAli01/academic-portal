import React, { useState, useEffect } from "react";
//import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { teacherQuiz, teacherSidebar } from "../../data";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuizes } from "../../redux/actions/courseAction";
import { Customtable } from "../../components/Customtable";
import { useNavigate } from "react-router-dom";
export const Quiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { quizes } = useSelector((state) => state.course);
  const [data, setData] = useState();
  useEffect(() => {
    dispatch(getAllQuizes());
  }, []);
  useEffect(() => {
    setData(quizes);
  }, [quizes]);
  const handleView = (id) => {
    navigate(`viewQuiz/${id}`);
  };
  return (
    <div>
      <table className="class-table ">
        <thead>
          <tr>
            <th>S/No</th>
            <th>Topic</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {console.log("data", data)}
          {data?.length >= 0
            ? data.map((element, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <th>{element?.topic}</th>
                    <th>{element?.dateSelected}</th>
                    <th>
                      <button
                        className="tableButton"
                        onClick={() => {
                          handleView(element.id);
                        }}
                      >
                        View
                      </button>
                    </th>
                  </tr>
                );
              })
            : "No Quizes Found"}
        </tbody>
      </table>
    </div>
  );
};
