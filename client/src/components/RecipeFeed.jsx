import React, { useState } from "react";
import { Card, Button, Container, Row, Col, Modal } from "react-bootstrap";
import mockRecipes from "../data/mockRecipes";
import "./RecipeFeed.css";
import carbonaraImage from "../assets/carbonara.jpeg";

const RecipeFeed = () => {
  const [show, setShow] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (recipe) => {
    setSelectedRecipe(recipe);
    setShow(true);
  };
  return (
    <>
      <Container className="feed-container">
        <Row className="justify-content-center">
          <Col>
            {mockRecipes.map((recipe) => (
              <div key={recipe._id} className="mb-4">
                <Card
                  onClick={() => handleShow(recipe)}
                  style={{ cursor: "pointer" }}
                >
                  <Row className="align-items-stretch">
                    <Col md={4} className="custom-card-img-wrapper">
                      <Card.Img
                        src={
                          recipe._id === "1" ? carbonaraImage : recipe.image.url
                        }
                        className="custom-card-img-left"
                      />
                    </Col>
                    <Col>
                      <Card.Body>
                        <Card.Title>{recipe.title}</Card.Title>
                        <Card.Text>{recipe.description}</Card.Text>
                        <ul className="list-group list-group-flush">
                          {recipe.ingredients.map((ingredient, index) => (
                            <li key={index} className="list-group-item">
                              {ingredient}
                            </li>
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

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedRecipe?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={
              selectedRecipe?._id === "1"
                ? carbonaraImage
                : selectedRecipe?.image.url
            }
            alt={selectedRecipe?.title}
            className="img-fluid mb-4"
          />
          <h5>Description</h5>
          <p>{selectedRecipe?.description}</p>
          <h5>Ingredients</h5>
          <ul className="list-group list-group-flush">
            {selectedRecipe?.ingredients.map((ingredient, index) => (
              <li key={index} className="list-group-item">
                {ingredient}
              </li>
            ))}
          </ul>
          <h5 className="mt-4">Instructions</h5>
          <p>{selectedRecipe?.instructions}</p>
          {"This is just set to description for now: "}
          {selectedRecipe.description}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RecipeFeed;
