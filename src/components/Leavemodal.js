import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { InputGroup, Form } from "react-bootstrap";
import { Customdropdown } from "./Customdropdown";
export const Leavemodal = ({
  studentRequest,
  userRequestHandler,
  show,
  handleClose,
  handleUpdateData,
  studentCourses,
  error,
}) => {
  const [selectedCategory, setCategorySelected] = useState(
    studentRequest.name ? studentRequest : { name: "Select course" }
  );
  console.log("Student courses are ", studentCourses);
  const current = new Date();
  const tempMonth = current.getMonth() + 1;
  const currentMonth = tempMonth < 10 ? `0${tempMonth}` : tempMonth;
  const currentDate = `${current.getFullYear()}-${currentMonth}-${
    current.getDate() + 1
  }`;
  // const handleCategorySelected = (item) => {
  //   setCategorySelected(item);
  // };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Leave request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup>
            {/* <InputGroup.Text>Course Name: </InputGroup.Text>
            <Form.Control
              name="name"
              value={studentRequest.name}
              aria-label="With textarea"
              type="text"
              onChange={(e) => {
                userRequestHandler(e);
              }}
            /> */}
            <Customdropdown
              selected={selectedCategory}
              data={studentCourses}
              setCategorySelected={setCategorySelected}
              titleProperty="name"
            />
          </InputGroup>
          <hr />
          <InputGroup>
            <InputGroup.Text>Leave date:</InputGroup.Text>
            <Form.Control
              name="date"
              value={studentRequest.date || currentDate}
              aria-label="With textarea"
              type="date"
              min={currentDate}
              onChange={(e) => {
                userRequestHandler(e);
              }}
            />
          </InputGroup>
          <hr />
          <InputGroup>
            <InputGroup.Text>Leave reason:</InputGroup.Text>
            <Form.Control
              name="reason"
              onChange={(e) => {
                userRequestHandler(e);
              }}
              value={studentRequest.reason}
              as="textarea"
              aria-label="With textarea"
            />
          </InputGroup>
          <label className="leaveerror">{error}</label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleUpdateData(selectedCategory);
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
