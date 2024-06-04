import React from 'react';
import { Card } from 'react-bootstrap';
import './UserProfile.css'; // Import custom CSS if needed

const UserProfile = () => {
  return (
    <Card className="user-profile-card">
      <Card.Img variant="top" src="https://via.placeholder.com/150" alt="Profile Picture" />
      <Card.Body>
        <Card.Title>Kevin Wang</Card.Title>
        <Card.Text>
          Bio: I like cooking fdsfjisdj fj sdifjid sifj dsifjidsj fisdjfids fjdsi
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UserProfile;