import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import mockRecipes from '../data/mockRecipes';
import './RecipeFeed.css';

const RecipeFeed = () => {
  return (
    <Container className="mt-4 feed-container">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          {mockRecipes.map((recipe) => (
            <div key={recipe._id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={recipe.image.url} />
                <Card.Body>
                  <Card.Title>{recipe.title}</Card.Title>
                  <Card.Text>{recipe.description}</Card.Text>
                  <ul className="list-group list-group-flush">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="list-group-item">{ingredient}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};


export default RecipeFeed;