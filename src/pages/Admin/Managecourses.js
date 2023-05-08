import React, { useState, useEffect } from "react";
//import { Customnavbar } from "../../components/Customnavbar";
import { Link } from "react-router-dom";
import { Table } from "../../components/Table";
import { Sidebar } from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { Addcourse } from "./Addcourse";
import { Customtable } from "../../components/Customtable";
import { adminCourseColumns, adminHeaders, adminSidebar } from "../../data";
import { useDispatch, useSelector } from "react-redux";
import {
  AddCourse,
  deleteCourse,
  getAllCourses,
  getAllTeacher,
  updateCourse,
} from "../../redux/actions/courseAction";
//import { Custommodal } from "../../components/Custommodal";
import { Modal } from "../../components/Modal";
import { Averagecalculator } from "../../components/Averagecalculator";
import axios from "axios";
import { Coursemodal } from "../../components/Coursemodal";
import { Button } from "react-bootstrap";
export const Managecourses = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { courses } = useSelector((state) => state.course);
  const { teachers } = useSelector((state) => state.course);
  const [showModal, setShowModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [error, setError] = useState({
    courseNameError: "",
    teacherNameError: "",
  });
  const initialState = {
    id: 0,
    teacherName: "Select Teacher",
    name: "",
  };
  const [courseData, setCourseData] = useState(initialState);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [userTeachers, setUserTeachers] = useState([]);
  const dispatch = useDispatch();
  //const [average, setAverage] = useState(0);
  const handleCourseDataChange = (e) => {
    setCourseData((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });
  };
  const handleEdit = (course) => {
    setError({
      teacherNameError: "",
      courseNameError: "",
    });
    setIsUpdate(true);
    console.log("course got is ", course);
    setCourseData({
      id: course.id,
      name: course.name,
      teacherName: course.teacherName,
    });
    handleShow();
  };
  const hanldeCourseAdd = () => {
    setError({
      teacherNameError: "",
      courseNameError: "",
    });
    setIsUpdate(false);
    setCourseData(initialState);
    handleShow();
  };

  // useEffect(() => {
  //   if (
  //     error.courseNameError.length === 0 &&
  //     error.teacherNameError.length === 0
  //   ) {
  //   }
  // }, [error.courseNameError, error.teacherNameError]);
  const checkErrors = (teacherName, courseName) => {
    setError({
      teacherNameError: "",
      courseNameError: "",
    });
    var er1,
      er2 = 0;
    if (teacherName == initialState.teacherName) {
      setError((state) => ({
        ...state,
        teacherNameError: "Teacher Name is required",
      }));
      er1 = 1;
    }
    if (courseName.trim().length <= 0) {
      setError((state) => ({
        ...state,
        courseNameError: "Course name is required",
      }));
      er2 = 1;
    }
    if (er1 == 0 || er2 == 0) {
      return "noErrors";
    } else if (er1 == 1 || er2 == 1) {
      return "errors";
    }
  };
  const handleSave = (selectedCategory) => {
    const res = checkErrors(selectedCategory.teacherName, courseData.name);
    console.log("result by check errors is ", res);
    if (res === "noErrors") {
      if (isUpdate == false) {
        //newData
        // console.log(selectedCategory);

        let data = {
          name: courseData.name,
          teacherId: selectedCategory.teacherId,
          teacherName: selectedCategory.teacherName,
          studentIds: [],
          classes: 0,
        };
        dispatch(AddCourse(data));
      } else {
        //old data update
        dispatch(
          updateCourse({
            id: courseData.id,
            name: courseData.name,
            teacherId: selectedCategory.id,
            teacherName: selectedCategory.teacherName,
          })
        );
      }

      handleClose();
    }
  };
  const lengthCalulator = (itemStudents) => {
    return itemStudents?.length ?? 0;
  };
  const gettingAllClasses = async (courseId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/classes/?courseId=${courseId}`
      );
      return { classes: response.data };
    } catch (e) {
      console.log(e);
    }
  };
  const averageCalculator = async (courseStudents, courseClasses, courseId) => {
    let totalStudents = lengthCalulator(courseStudents);
    const allClasses = await gettingAllClasses(courseId);
    console.log(
      "Result of getting all classes of course are",
      courseId,
      allClasses.classes
    );
    let res = allClasses.classes.reduce((item, acc) => {
      return acc + item.studentIds ? item?.studentIds.length : 0;
    }, 0);
    console.log("res is ", res);
    //setAverage(res);
  };
  const handleView = (course) => {
    navigate(`courseRegister/${course.id}`);
  };
  const handleDelete = (id) => {
    dispatch(deleteCourse());
  };
  const handleBlur = (e) => {
    if (e.target.value.trim().length <= 0) {
      setError((state) => ({
        ...state,
        courseNameError: "Course Name is required",
      }));
    }
  };
  useEffect(() => {
    dispatch(getAllCourses());
  }, []);
  useEffect(() => {
    dispatch(getAllTeacher());
  }, []);
  useEffect(() => {
    if (teachers.length) {
      let tempData = teachers.map((teacher) => {
        return {
          teacherId: teacher.id,
          teacherName: teacher.username,
        };
      });
      setUserTeachers(tempData);
    }
  }, [teachers]);
  useEffect(() => {
    const refactorData = () => {
      console.log("courses changed");
      if (courses.length) {
        const Data = courses.map((item, ind) => {
          // let res = Averagecalculator({
          //   totalStudents: item.studentIds.length,
          //   totalClasses: item.classes,
          //   classId: item.id,
          // });
          return {
            ...item,
            totalStudents: item?.studentIds?.length || 0,
            serialNo: ind + 1,
          };
        });
        setData(Data);
      }
    };
    refactorData();
  }, [courses]);
  return (
    <div>
      <h3 className="head">Add course</h3>
      <Button onClick={hanldeCourseAdd} className="coursenameaddbutton">
        Add Course
      </Button>
      {/* <Addcourse /> */}
      {courses.length > 0 ? (
        <Customtable
          headers={adminHeaders}
          data={data}
          handleEdit={handleEdit}
          handleView={handleView}
        />
      ) : (
        <h3>No courses found</h3>
      )}
      {show && (
        <Coursemodal
          courseData={courseData}
          handleCourseDataChange={handleCourseDataChange}
          teachers={userTeachers}
          show={show}
          error={error}
          handleBlur={handleBlur}
          handleClose={handleClose}
          handleSave={handleSave}
        />
      )}
      {/* {showModal && (
        <Modal
          courseData={courseData}
          teachers={teachers}
          setShowModal={setShowModal}
        />
      )} */}
    </div>
  );
};
//
