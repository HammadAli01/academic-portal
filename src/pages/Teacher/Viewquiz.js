import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
//import { Navbar } from "../../components/Customnavbar";
import { Sidebar } from "../../components/Sidebar";
import { teacherSidebar } from "../../data";
import { getUsers } from "../../redux/actions/Actions";
import { getQuiz } from "../../redux/actions/courseAction";
export const Viewquiz = () => {
  const dispatch = useDispatch();
  const { quizSelected } = useSelector((state) => state.course);
  const { users } = useSelector((state) => state.user);
  const [students, setStudents] = useState([]);
  const [quizData, setQuizData] = useState();
  const { quizId } = useParams();

  useEffect(() => {
    dispatch(getQuiz(quizId));
  }, [quizId]);
  useEffect(() => {
    setQuizData(quizSelected.res);
  }, [quizSelected]);
  useEffect(() => {
    dispatch(getUsers("student"));
  }, []);
  useEffect(() => {
    setStudents(users);
  }, [users]);
  return (
    <div>
      <table className="class-table ">
        <thead>
          <tr>
            <th>S/No</th>
            <th>Username</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {console.log("data", quizData)}
          {quizData?.length >= 0
            ? quizData.map((element, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    {console.log(students)}
                    <th>
                      {students.find((item) => item.id == element.id).username}
                    </th>
                    <th>{element?.marks}</th>
                  </tr>
                );
              })
            : "No quiz Found"}
        </tbody>
      </table>
    </div>
  );
};
//students[students.indexOf(element.id)].username
