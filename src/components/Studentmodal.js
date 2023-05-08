import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { InputGroup, Form } from "react-bootstrap";
export const Studentmodal = ({
  studentData,
  show,
  handleClose,
  handleSave,
  handleChange,
  error,
}) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="addstudentfield">
            <InputGroup.Text> Name </InputGroup.Text>
            <Form.Control
              name="username"
              type="text"
              value={studentData.username}
              placeholder="Enter Student Name"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </InputGroup>
          <InputGroup className="addstudentfield">
            <InputGroup.Text> Email </InputGroup.Text>
            <Form.Control
              name="email"
              aria-label="email"
              type="email"
              value={studentData.email}
              placeholder="Enter Student Email"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </InputGroup>
          <InputGroup className="addstudentfield">
            <InputGroup.Text> password </InputGroup.Text>
            <Form.Control
              name="password"
              aria-label="Password"
              type="text"
              placeholder="Enter Student Password"
              value={studentData.password}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </InputGroup>
          <label>{error}</label>
          {/* <label className="coursenameError">{error.courseNameError}</label>

          <label className="modallabel teacherlabel">Course Teacher </label> */}
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
    </>
  );
};
