import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserProfile from './UserProfile';
import RecipeFeed from './RecipeFeed';
import './HomePage.css';

const HomePage = () => {
  return (
    <Container fluid className="home-page-container mt-4">
      <Row className="align-items-start">
        <Col xs={12} md={3} className="user-profile-column d-flex flex-column">
          <UserProfile />
        </Col>
        <Col xs={12} md={9} className="recipe-feed-column d-flex flex-column">
          <RecipeFeed />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;