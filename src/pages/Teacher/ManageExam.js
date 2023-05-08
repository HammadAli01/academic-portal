import React, { useState, useEffect } from "react";
import { Customtable } from "../../components/Customtable";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { InputGroup, Form } from "react-bootstrap";
import { Customdropdown } from "../../components/Customdropdown";
import { useSelector, useDispatch } from "react-redux";
//import { Navbar } from "../../components/Navbar";
import axios from "axios";
import { Sidebar } from "../../components/Sidebar";
import {
  addExam,
  getCourses,
  getExam,
  updateExam,
} from "../../redux/actions/courseAction";
import { TeacherExam, teacherSidebar } from "../../data";
export const ManageExam = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const current = new Date();
  const tempMonth = current.getMonth() + 1;
  const currentMonth = tempMonth < 10 ? `0${tempMonth}` : tempMonth;
  const currentDate = `${current.getFullYear()}-${currentMonth}-${
    current.getDate() + 1
  }`;
  const initialState = {
    id: 0,
    courseName: "Select Course",
    date1: currentDate,
    date2: currentDate,
    date3: currentDate,
  };
  const [dateError, setDateError] = useState("");
  const [courseError, setCourseError] = useState("");
  const [examData, setExamData] = useState(initialState);
  const [selectedCategory, setCategorySelected] = useState(examData);
  const [coursesList, setCoursesList] = useState([]);
  const { user } = useSelector((state) => state.user);
  const { courses, exams } = useSelector((state) => state.course);
  const [allExams, setAllExams] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch();
  const hanldeExamAdd = () => {
    setExamData(initialState);
    setCategorySelected(initialState);
    setCourseError("");
    setDateError("");
    setIsUpdate(false);
    handleShow();
  };
  const handleChange = (e) => {
    setExamData((state) => ({
      ...state,
      [[e.target.name]]: e.target.value,
    }));
  };
  const handleEdit = (item) => {
    setIsUpdate(true);
    setExamData(item);
    setCategorySelected(item);
    setCourseError("");
    setDateError("");
    handleShow();
  };
  const handleSave = async () => {
    setDateError("");
    setCourseError("");
    const response = await axios.get(
      `${process.env.REACT_APP_API}/exam/?courseId=${selectedCategory.courseId}`
    );
    console.log("response length ", response.data.length);
    if (response.data.length == 0 || isUpdate == true) {
      if (
        examData.date1 == examData.date2 ||
        examData.date1 == examData.date3 ||
        examData.date2 == examData.date3
      ) {
        setDateError("Kindly select three different dates");
      } else if (selectedCategory.courseName !== initialState.courseName) {
        if (dateError.length == 0 && courseError.length == 0) {
          let filteredExam = {
            courseId: selectedCategory.courseId,
            courseName: selectedCategory.courseName,
            date1: { date: examData.date1, studentsIds: [] },
            date2: { date: examData.date2, studentsIds: [] },
            date3: { date: examData.date3, studentsIds: [] },
          };
          if (isUpdate == false) {
            console.log("data   ", filteredExam);
            dispatch(addExam(filteredExam));
            handleClose();
          } else {
            dispatch(updateExam(examData.id, filteredExam));
            handleClose();
          }
        }
      } else {
        setCourseError("Course name is required");
      }
    } else {
      setDateError("Exam already exists of this course");
    }
  };
  useEffect(() => {
    dispatch(getCourses(user.id));
  }, []);
  useEffect(() => {
    dispatch(getExam());
  }, []);
  useEffect(() => {
    const data = exams.map((exam, ind) => {
      return {
        id: exam.id,
        courseName: exam.courseName,
        courseId: exam.courseId,
        date1: exam.date1.date,
        date2: exam.date2.date,
        date3: exam.date3.date,
        serialNo: ind + 1,
      };
    });
    setAllExams(data);
  }, [exams]);
  useEffect(() => {
    if (courses.length) {
      const Data = courses.map((item, ind) => {
        return {
          courseName: item.name,
          courseId: item.id,
          serialNo: ind + 1,
        };
      });
      setCoursesList(Data);
    }
  }, [courses]);

  return (
    <div>
      <Button onClick={hanldeExamAdd} className="examaddbutton">
        Add Exam
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Exam</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="course-selected-label">Course Selected </label>
          <Customdropdown
            selected={selectedCategory}
            data={coursesList}
            setCategorySelected={setCategorySelected}
            titleProperty="courseName"
          />
          <label className="courseSelecterror">{courseError}</label>
          <InputGroup>
            <label className="modallabel"> Date-1 </label>
            <Form.Control
              className="modalinput"
              name="date1"
              type="date"
              value={examData.date1}
              placeholder="Enter Student Name"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </InputGroup>

          <InputGroup>
            <label className="modallabel"> Date-2 </label>
            <Form.Control
              className="modalinput"
              name="date2"
              type="date"
              value={examData.date2}
              placeholder="Enter Student Name"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </InputGroup>
          <InputGroup>
            <label className="modallabel"> Date-3 </label>
            <Form.Control
              className="modalinput"
              name="date3"
              type="date"
              value={examData.date3}
              placeholder="Enter Student Name"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </InputGroup>
          <label className="dateError">{dateError}</label>
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
      <Customtable
        headers={TeacherExam}
        data={allExams}
        handleEdit={handleEdit}
      />
    </div>
  );
};
