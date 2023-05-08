import React, { useState, useEffect } from "react";
import { Customtable } from "../../components/Customtable";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { InputGroup, Form } from "react-bootstrap";
import { Customdropdown } from "../../components/Customdropdown";
import { useSelector, useDispatch } from "react-redux";
import { studentExamHeaders, studentSidebar } from "../../data";
//import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import axios from "axios";
import { bookExam, getExam } from "../../redux/actions/courseAction";
export const ViewExam = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const { courses, exams } = useSelector((state) => state.course);
  const [allExams, setAllExams] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [allCourses, setAllCourses] = useState([]);
  const initialState = {
    id: 1,
    courseId: 0,
    courseName: "select Course",
  };
  const initialDate = {
    date: "Select Date",
    studentsIds: [],
  };
  const [examDataSelected, setExamDataSelected] = useState(initialState);
  const [error, setError] = useState("");
  const [courseSelectedCategory, setCourseCategorySelected] =
    useState(examDataSelected);
  const [dateSelected, setDateSelected] = useState(initialDate);
  const [courseDates, setcourseDates] = useState([]);
  const handleSave = () => {
    if (
      dateSelected.date !== initialDate.date &&
      courseSelectedCategory.courseName !== initialState.courseName
    ) {
      let index = courseDates.indexOf(dateSelected);
      // setDateSelected((state) => {
      //   return {
      //     date: state.date,
      //     studentsIds: [...state.studentsIds, user.id],
      //   };
      // });
      if (index == 0) {
        dispatch(
          bookExam(courseSelectedCategory.id, "date1", {
            date: dateSelected.date,
            studentsIds: [...dateSelected.studentsIds, user.id],
          })
        );
        handleClose();
      } else if (index == 1) {
        dispatch(
          bookExam(courseSelectedCategory.id, "date2", {
            date: dateSelected.date,
            studentsIds: [...dateSelected.studentsIds, user.id],
          })
        );
        handleClose();
      } else if (index == 2) {
        dispatch(
          bookExam(courseSelectedCategory.id, "date3", {
            date: dateSelected.date,
            studentsIds: [...dateSelected.studentsIds, user.id],
          })
        );
        handleClose();
      }
    } else {
      setError("Select both dropdowns");
    }
  };
  useEffect(() => {
    dispatch(getExam());
  }, []);
  useEffect(() => {
    if (exams.length > 0) {
      const data = exams
        .map((exam, ind) => {
          console.log(exam.date1.studentsIds, user.id);
          let dateBooked =
            exam?.date1?.studentsIds?.includes(user.id) == true
              ? exam.date1.date
              : exam?.date2?.studentsIds?.includes(user.id) == true
              ? exam.date2.date
              : exam?.date3?.studentsIds?.includes(user.id) == true
              ? exam.date3.date
              : "Not booked";
          if (dateBooked !== "Not booked") {
            return {
              id: exam.id,
              courseName: exam.courseName,
              courseId: exam.courseId,
              dateBooked: dateBooked,
            };
          }
        })
        .filter((exam) => exam !== undefined);

      setAllExams(data);
      console.log("data exam are ", data, allCourses);

      let courseData = [];
      allCourses.map((course) => {
        data.filter((exam) => {
          if (exam.courseId !== course.courseId) {
            if (data.includes(course) == false) {
              if (data.find((item) => item.id !== course.courseId)) {
                courseData.push(course);
              }
            }
          }
        });
      });
      console.log("filtered courses are ", courseData);
      setAllCourses(courseData);
    }
  }, [exams]);
  useEffect(() => {
    let data = courses
      .filter((course) => course.studentIds.includes(user.id))
      .map((course) => {
        return { ...course, courseName: course.name, courseId: course.id };
      });

    setAllCourses(data);
  }, [courses]);
  const hanldeExamBook = () => {
    setDateSelected(initialDate);
    handleShow();
  };
  const getCourseDates = async (id) => {
    const response = await axios.get(`${process.env.REACT_APP_API}/exam/${id}`);
    let filteredData = [
      response.data.date1,
      response.data.date2,
      response.data.date3,
    ];
    setcourseDates(filteredData);
  };
  useEffect(() => {
    getCourseDates(courseSelectedCategory.id);
  }, [courseSelectedCategory]);
  return (
    <div>
      <h3 className="head">Exams</h3>
      <Button onClick={hanldeExamBook} className="examaddbutton">
        Book Exam
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Exam</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="modaldatelabel">Date Selected </label>
          <Customdropdown
            selected={dateSelected}
            data={courseDates}
            setCategorySelected={setDateSelected}
            titleProperty="date"
          />
          <label className="modalcourselabel">Course Selected </label>
          <Customdropdown
            selected={courseSelectedCategory}
            data={allCourses}
            setCategorySelected={setCourseCategorySelected}
            titleProperty="courseName"
          />

          <label>{error}</label>

          {/* <label>{dateError}</label> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSave()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Customtable headers={studentExamHeaders} data={allExams} />
    </div>
  );
};
