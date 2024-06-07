import { useState, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";

import "./ProfilePage.css";
import AppNavbar from "../components/Navbar";
import UserProfile from "../components/UserProfile";
import UserRecipes from "../components/UserRecipes";

const ProfilePage = () => {

	return (
    <div className="d-flex flex-wrap">
      <AppNavbar />
      <Container fluid className="profile-page-container">
        <Row className="align-items-start">
          <UserProfile />
        </Row>
        <Row className="align-items-start">
          <UserRecipes />
        </Row>
      </Container>
    </div>
	);
};

export default ProfilePage;