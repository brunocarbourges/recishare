import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

import "./Navbar.css";
import logo from '../assets/recishare.png';

const AppNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand className="navbar-brand-custom">
          <img src={logo} height="30" className="d-inline-block align-top" alt="Recishare logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">{"\u{1f3e1}"}</Nav.Link>
            <Nav.Link href="/profile">{"\u{1f464}"}</Nav.Link>
            <Nav.Link href="/search">{"\u{1f50e}"}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;