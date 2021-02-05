import React from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar expand="xl" id="main-nav" className="mt-3">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <div className="d-flex align-items-center mx-4  logo-container">
            <i className="fab fa-dev mr-2"></i>
            <p className="mb-0 font-weight-bold">_DevSearch</p>
          </div>
          <Link to="/">Home</Link>
          <Link to="#">Jobs</Link>
          <Link to="#">Courses</Link>
          <Link to="#">Career Advice</Link>
          <Link to="/favourites">Your Favourites</Link>
          <div className="d-flex align-items-center ml-4">
            <p className="font-weight-bold mb-0">Recruiting? | </p>
            <Link to="#" className="dark-background light-text rounded-pill px-4 py-1" style={{ fontSize: 16 }}>
              Post a job
            </Link>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
