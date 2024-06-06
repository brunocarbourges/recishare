import { useContext } from 'react';
import { Card } from 'react-bootstrap';

import './UserProfile.css'; 
import { UserContext } from '../contexts/userContext';

const UserProfile = () => {
  const { user } = useContext(UserContext);

  return (
    <Card className="user-profile-card">
      <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Profile Picture" />
      <Card.Body className="text-center">
        <Card.Title> {user.username} </Card.Title>
        <Card.Text>
          Member since: {user.createdAt}
        </Card.Text>
        <a href="#" className="btn btn-primary" >+</a>
      </Card.Body>
    </Card>
  );
};

export default UserProfile;