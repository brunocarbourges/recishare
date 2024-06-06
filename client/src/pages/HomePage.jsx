import { Container, Row, Col } from 'react-bootstrap';

import './HomePage.css';
import UserProfile from '../components/UserProfile';
import RecipeFeed from '../components/RecipeFeed';
import AppNavbar from '../components/Navbar'

const HomePage = () => {
  return (
    <div>
	  <AppNavbar />
	  <Container fluid className="home-page-container mt-4">
      <Row className="align-items-start">
        <Col xs={12} md={3} className="user-profile-column">
          <UserProfile />
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