import { Container, Row, Col } from 'react-bootstrap';
import './HomePage.css';
import UserProfile from '../components/UserProfile';
import RecipeFeed from '../components/RecipeFeed';
import AppNavbar from '../components/Navbar';
import SavedFeed from '../components/SavedFeed'; // Ensure this import path is correct

const HomePage = () => {
  return (
    <div className="d-flex flex-wrap">
      <AppNavbar />
      <Container fluid className="home-page-container mt-4">
        <Row className="align-items-start">
          <Col xs={12} md={3} className="user-profile-column">
            <UserProfile />
            <SavedFeed />
          </Col>
          <Col xs={12} md={9} className="recipe-feed-column">
            <RecipeFeed />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
