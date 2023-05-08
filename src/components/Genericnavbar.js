import React from "react";
import "../styles/navbar.css";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useDispatch } from "react-redux";

import { resetStore } from "../redux/actions/Actions";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
export const Genericnavbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("role");
    dispatch(resetStore());
  };
  return (
    <div>
      <Navbar style={{ backgroundColor: "#09f" }} variant="dark">
        <Container>
          <Navbar.Brand href="#home">Attendance Management System</Navbar.Brand>
          <Nav>
            <Nav.Link>{user.role} Portal</Nav.Link>
            <LinkContainer to="/">
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};
