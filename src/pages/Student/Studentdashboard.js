import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { studentSidebar } from "../../data";
import {
  getAllCourses,
  updateCourseStudents,
} from "../../redux/actions/courseAction";

export const Studentdashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { courses } = useSelector((state) => state.course);
  const [allCourses, setAllCourses] = useState([]);
  const [registered, setRegistered] = useState([]);
  const handleChangeRegistration = (course, action) => {
    console.log("Registered", registered);
    if (action === "present") {
      setRegistered((state) => state.filter((item) => item !== course));
      //   setRegistered((state) =>
      //     state.filter((item) => {
      //       if (item.studentIds.includes(user.id)) {
      //         return;
      //       } else {
      //         return item;
      //       }
      //     })
      //   );
    } else {
      if (registered.length === 6) {
        alert("Students cannot register more than 6 courses");
      } else {
        course.studentIds.push(user.id);
        // console.log("COURSE IS NOW ",course.studentIds);
        setRegistered((state) => [...state, course]);
      }
    }
  };
  const handleView = (id) => {
    navigate(`viewClasses/${id}`);
  };
  const handleSave = () => {
    //update request by looping registered courses
    console.log("Registered are ", registered);
    registered.forEach((register) => {
      //console.log("Register call is ", register.id, register.studentIds);
      dispatch(updateCourseStudents(register.id, register.studentIds));
    });
    allCourses.forEach((course) => {
      let res = registered.includes(course);
      if (res === false) {
        //course id, student id
        let sortedStudents = course.studentIds.filter((id) => id !== user.id);
        dispatch(updateCourseStudents(course.id, sortedStudents || []));
      }
    });
    dispatch(getAllCourses());
  };
  useEffect(() => {
    dispatch(getAllCourses());
  }, []);
  // useEffect(() => {
  //   console.log("Registered are ", registered);
  // }, [registered]);
  useEffect(() => {
    if (allCourses.length > 0) {
      let result = allCourses.filter((course) => {
        return course?.studentIds?.includes(user.id);
      });

      //console.log("RESULT IS ", result, user.id);
      setRegistered(result);
    }
  }, [allCourses]);
  useEffect(() => {
    if (courses.length > 0) {
      let result = courses.filter((item) => item.status !== "InActive");
      //console.log("RESULT IS ", result, user.id);
      setAllCourses(result);
    }
  }, [courses]);
  return (
    <div>
      <h3 className="head">Classes</h3>
      <div className="class-table">
        <table>
          <thead>
            <tr>
              <th>S/No</th>
              <th>Name</th>
              <th>Total Classes</th>
              <th>Registered</th>
              <th>UnRegistered</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allCourses?.length > 0
              ? allCourses.map((course, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{course?.name}</td>
                      <td>{course?.classes}</td>
                      {registered[
                        registered.indexOf(course)
                      ]?.studentIds?.includes(user.id) ? (
                        <td>Registered</td>
                      ) : (
                        <td
                          onClick={() => {
                            handleChangeRegistration(course, "absent");
                          }}
                        >
                          Mark Registered
                        </td>
                      )}
                      {registered[
                        registered.indexOf(course)
                      ]?.studentIds?.includes(user.id) ? (
                        <td
                          onClick={() => {
                            handleChangeRegistration(course, "present");
                          }}
                        >
                          Mark UnRegistered
                        </td>
                      ) : (
                        <td>UnRegistered</td>
                      )}

                      {registered[
                        registered.indexOf(course)
                      ]?.studentIds?.includes(user.id) ? (
                        <td>
                          <button
                            className="tableButton editview"
                            onClick={() => {
                              handleView(course.id);
                            }}
                          >
                            View
                          </button>
                        </td>
                      ) : (
                        <td>-</td>
                      )}
                    </tr>
                  );
                })
              : "No Courses Found"}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => {
          handleSave();
        }}
        className="save"
      >
        Save
      </button>
    </div>
  );
};
//registered courses-unregistered courses-cannot get registered in more than 6 courses
//seleccted course-classes taken-classes not taken
//request leave- course-date  -techer-admin-fulfill
