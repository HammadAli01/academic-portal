import React, { useState, useEffect } from "react";
//import { Navbar } from "../../components/Customnavbar";
import { Sidebar } from "../../components/Sidebar";
import { studentSidebar } from "../../data";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuizes } from "../../redux/actions/courseAction";
export const Studentviewquiz = () => {
  const dispatch = useDispatch();
  const [quizData, setQuizData] = useState();
  const { quizes } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllQuizes());
  }, []);
  useEffect(() => {
    if (quizes.length > 0) {
      let data = quizes
        .map((quiz) => {
          console.log("quiz is ", quiz);
          let res = quiz.res.find((item) => item.id == user.id);
          console.log("res is ", res);
          if (res) {
            return quiz;
          }
        })
        .filter((quiz) => quiz !== undefined);
      console.log("users quizes are ", data);
      setQuizData(data);
    }
  }, [quizes]);
  return (
    <div>
      <h3 className="head">Quizes</h3>
      <table className="class-table ">
        <thead>
          <tr>
            <th>S/No</th>
            <th>course Name</th>
            <th>topic</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {quizData?.length >= 0
            ? quizData.map((element, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <th>{element.courseName}</th>
                    <th>{element.topic}</th>
                    <th>
                      {element?.res?.find((item) => item.id == user.id)?.marks}
                    </th>
                  </tr>
                );
              })
            : "No quiz Found"}
        </tbody>
      </table>
    </div>
  );
};
