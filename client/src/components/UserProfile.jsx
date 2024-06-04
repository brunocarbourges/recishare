import React from 'react';
import { Card } from 'react-bootstrap';
import './UserProfile.css'; 

const UserProfile = () => {
  return (
    <Card className="user-profile-card">
      <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Profile Picture" />
      <Card.Body className="text-center">
        <Card.Title>Test User</Card.Title>
        <Card.Text>
          Bio: I like cooking fdsfjisdj fj sdifjid sifj dsifjidsj fisdjfids fjdsi
        </Card.Text>
        <a href="#" className="btn btn-primary" >+</a>
      </Card.Body>
    </Card>
  );
};

export default UserProfile;