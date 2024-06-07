import { useState, useContext, useEffect } from 'react';
import { Card, Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { UserContext } from '../contexts/userContext';
import { getSavedRecipe } from '../services/savedService';
import './SavedFeed.css';

const SavedFeed = () => {
  const [show, setShow] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [savedFeed, setSavedFeed] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchSavedFeed = async () => {
      const feed = await getSavedRecipe(user.id);
      if (feed.success) {
        setSavedFeed(feed.data);
      } else {
        console.error(feed.error);
      }
    };

    fetchSavedFeed();
  }, [user.id]);

  const handleClose = () => setShow(false);
  const handleShow = (recipe) => {
    setSelectedRecipe(recipe);
    setShow(true);
  };

  return (
    <>
      <Container className="saved-container">
        <Row className="align-items-stretch">
          <Card.Title className="text-center">Your Saved Recipes:</Card.Title>
        </Row>
      </Container>

      <Container className="saved-container">
        <Row className="justify-content-center">
          <Col>
            {savedFeed.map((recipe) => (
              <div key={recipe.id} className="mb-2">
                <Card onClick={() => handleShow(recipe)} style={{ cursor: 'pointer' }}>
                  <Row className="align-items-stretch">
                    <Col>
                      <Card.Body>
                        <Card.Title>{recipe.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Author: {recipe.user.username}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">Date: {recipe.createdAt.slice(0, 10)}</Card.Subtitle>
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
        {selectedRecipe && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedRecipe.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img src={selectedRecipe.image.url} alt={selectedRecipe.title} className="img-fluid mb-4" />
              <h5>Description</h5>
              <p>{selectedRecipe.description}</p>
              <h5>Ingredients</h5>
              <ul className="list-group list-group-flush">
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="list-group-item">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
};

export default SavedFeed;
