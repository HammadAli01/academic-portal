import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { InputGroup, Form } from "react-bootstrap";
import { Customdropdown } from "./Customdropdown";
export const Coursemodal = ({
  courseData,
  handleCourseDataChange,
  teachers,
  show,
  handleBlur,
  handleClose,
  handleSave,
  error,
}) => {
  const [selectedCategory, setCategorySelected] = useState(courseData);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup>
            <label className="modallabel">Course Name </label>
            <Form.Control
              className="modalinput"
              name="name"
              value={courseData.name}
              type="text"
              onBlur={(e) => {
                handleBlur(e);
              }}
              onChange={(e) => {
                handleCourseDataChange(e);
              }}
            />
          </InputGroup>
          <label className="coursenameError">{error.courseNameError}</label>

          <label className="modallabel teacherlabel">Course Teacher </label>
          <Customdropdown
            selected={selectedCategory}
            data={teachers}
            setCategorySelected={setCategorySelected}
            titleProperty="teacherName"
          />
          <label className="teachernameError">{error.teacherNameError}</label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleSave(selectedCategory)}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
