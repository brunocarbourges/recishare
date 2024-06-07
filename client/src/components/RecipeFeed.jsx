import { useState, useContext, useEffect } from "react";
import { Card, Button, Container, Row, Col, Modal } from "react-bootstrap";
import ScrollReveal from 'scrollreveal';
import "./RecipeFeed.css";
import { UserContext } from "../contexts/userContext.jsx";
import { getRecipeFeed } from "../services/recipeService.js";

const RecipeFeed = () => {
  const [show, setShow] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [recipeFeed, setRecipeFeed] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchRecipeFeed = async () => {
      const feed = await getRecipeFeed(user.id);
      if (feed.success) {
        setRecipeFeed(feed.data);
      } else {
        console.error(feed.error);
      }
    };

    fetchRecipeFeed();
  }, [user.id]);


  const handleClose = () => setShow(false);
  const handleShow = (recipe) => {
    setSelectedRecipe(recipe);
    setShow(true);
  };
  useEffect(() => {
    const sr = ScrollReveal({
      origin: "top",
      duration: 2000,
      distance: '30px',
      reset: true,
    });

    sr.reveal(".mb-4", {
      interval: 200,
    });
  }, []);

  
  return (
    <>
      <Container className="feed-container">
        <Row className="justify-content-center">
          <Col>

            {/* Here, we map the list of recipes to rendering components */}
            {recipeFeed.map((recipe) => (
              <div className="mb-4">
                <Card onClick={() => handleShow(recipe)} style={{ cursor: "pointer" }}>
                  <Row className="align-items-stretch">
                    <Col md={4} className="custom-card-img-wrapper">
                      <Card.Img src={recipe.image.url} className="custom-card-img-left" />
                    </Col>
                    <Col>
                      <Card.Body>
                        <Card.Title>{recipe.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Author: {recipe.user.username} </Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">Date: {recipe.createdAt.slice(0, 10)} </Card.Subtitle>
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
              <h5>Author</h5>
              <p>{selectedRecipe.user.username}</p>
              <h5>Date</h5>
              <p>{selectedRecipe.createdAt.slice(0, 10)}</p>
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

export default RecipeFeed;
