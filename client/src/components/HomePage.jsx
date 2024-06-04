import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserProfile from './UserProfile';
import RecipeFeed from './RecipeFeed';
import './HomePage.css';

const HomePage = () => {
  return (
    <Container fluid className="home-page-container mt-4">
      <Row>
        <Col xs={6} md={2} className="user-profile-column">
          <UserProfile />
        </Col>
        <Col xs={12} md={8} className="recipe-feed-column">
          <RecipeFeed />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;