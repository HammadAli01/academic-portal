import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCourse } from "../redux/actions/courseAction";
export const Modal = ({ updateData, teachers, setShowModal }) => {
  const initialState = { id: 0, name: "", teacherName: "" };
  const dt = updateData || initialState;
  const dispatch = useDispatch();
  const [updatedData, setUpdatedData] = useState(dt);
  console.log("updated data in modal is ", updateData);
  const handleInput = (e) => {
    setUpdatedData((state) => ({ ...state, [e.target.name]: e.target.value }));
    console.log(e.target.value);
  };
  const handleCancel = () => {
    setShowModal(false);
    setUpdatedData(initialState);
  };
  const handleSave = () => {
    dispatch(updateCourse(updatedData));
    setShowModal(false);
    setUpdatedData(initialState);
  };
  return (
    <div className="modal">
      <h4>Update Course</h4>
      <label>Course Name:</label>
      <input
        type="text"
        value={updatedData.name}
        placeholder="Enter course name"
        name="name"
        onChange={(e) => {
          handleInput(e);
        }}
      />
      <div className="dropdown-container">
        <label className="dp-label">Course Teacher:</label>
        <div className="teacher-dropdown">
          <button className="teacher-dropbtn">{updatedData.teacherName}</button>
          <div className="teacher-dropdown-content">
            {teachers.map((teacher) => (
              <a
                onClick={() =>
                  setUpdatedData((state) => ({
                    ...state,
                    ["teacherName"]: teacher.username,
                  }))
                }
              >
                {teacher.username}
              </a>
            ))}
          </div>
        </div>
      </div>
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};
