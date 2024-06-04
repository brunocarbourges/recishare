import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import mockRecipes from '../data/mockRecipes';
import './RecipeFeed.css';
import carbonaraImage from '../assets/carbonara.jpeg';


const RecipeFeed = () => {
  return (
    <Container className="feed-container">
      <Row className="justify-content-center">
        <Col>
          {mockRecipes.map((recipe) => (
            <div key={recipe._id} className="mb-4">
              <Card>
                <Row className="align-items-stretch">
                  <Col md={4} className="custom-card-img-wrapper">
                    <Card.Img 
                      src={recipe._id === '1' ? carbonaraImage : recipe.image.url} 
                      className="custom-card-img-left" 
                    />
                  </Col>
                  <Col>
                    <Card.Body>
                      <Card.Title>{recipe.title}</Card.Title>
                      <Card.Text>{recipe.description}</Card.Text>
                      <ul className="list-group list-group-flush">
                        {recipe.ingredients.map((ingredient, index) => (
                          <li key={index} className="list-group-item">{ingredient}</li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default RecipeFeed;