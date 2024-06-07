import { useState, useContext, useEffect } from "react";
import { Card, Button, Container, Row, Col, Modal, Form } from "react-bootstrap";
import ScrollReveal from 'scrollreveal';
import "./RecipeFeed.css";
import { UserContext } from "../contexts/userContext.jsx";
import { searchRecipeFeed } from "../services/searchService.js";
import { rateRecipe, saveRecipe, unsaveRecipe } from "../services/saveRateService.js";
import { followUser, unfollowUser } from "../services/followService.js";

const SearchFeed = ({ query }) => {
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [feed, setFeed] = useState([]);
  const [rating, setRating] = useState(''); // State to store the rating
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchFeed = async () => {
      const result = await searchRecipeFeed(query);
      if (result.success) {
        setFeed(result.data);
      } else {
        console.error(result.error);
      }
    };

    if (query) {
      fetchFeed();
    }
  }, [query, user.id]);

  const handleClose = () => setShow(false);
  const handleShow = (recipe) => {
    setSelectedItem(recipe);
    setShow(true);
  };

  const handleFollow = async () => {
    if (selectedItem.followers) {
      const result = await followUser(selectedItem._id, user.id);
      if (result.success) {
        alert("User followed successfully!");
      }
      else {
        alert("User already followed!");
      }
    }
  };

  const handleUnfollow = async () => {
    if (selectedItem.followers) {
      const result = await unfollowUser(selectedItem._id, user.id);
      if (result.success) {
        alert("User unfollowed successfully!");
      }
      else {
        alert("User not followed!");
      }
    }
  };

  const handleSave = async () => {
    if (selectedItem.title) {
      const result = await saveRecipe(user.id, selectedItem._id);
      if (result.success) {
        alert("Recipe saved successfully!");
      }
      else {
        alert("Recipe already saved!");
      }
    }
  };

  const handleUnsave = async () => {
    if (selectedItem.title) {
      const result = await unsaveRecipe(user.id, selectedItem._id);
      if (result.success) {
        alert("Recipe unsaved successfully!");
      }
      else {
        alert("Recipe not saved!");
      }
    }
  };

  const handleRateChange = (event) => {
    setRating(event.target.value); // Capture the rating value
  };

  const handleRate = async () => {
    if (selectedItem.title) {
      const numericRating = Number(rating); // Convert rating to a number
      if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
        alert("Please enter a valid rating between 1 and 5.");
        return;
      }
      const result = await rateRecipe(user.id, selectedItem._id, numericRating); // Pass the rating value
      if (result.success) {
        alert("Recipe rated successfully!");
      }
    }
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

  const renderCard = (item) => {
    if (item.title) {
      // Render recipe card
      return (
        <Card onClick={() => handleShow(item)} style={{ cursor: "pointer" }}>
          <Row className="align-items-stretch">
            <Col md={4} className="custom-card-img-wrapper">
              <Card.Img src={item.image.url} className="custom-card-img-left" />
            </Col>
            <Col>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Author: {item.username}</Card.Subtitle>
                <Card.Text>{item.description}</Card.Text>
                <ul className="list-group list-group-flush">
                  {item.ingredients.map((ingredient, index) => (
                    <li key={index} className="list-group-item">
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      );
    } else if (item.username) {
      // Render user card
      return (
        <Card onClick={() => handleShow(item)} style={{ cursor: "pointer" }}>
          <Row className="align-items-stretch">
            <Col md={4} className="custom-card-img-wrapper">
              <Card.Img src={'../src/assets/xiaojie.png'} className="custom-card-img-left" />
            </Col>
            <Col>
              <Card.Body>
                <Card.Title>{item.username}</Card.Title>
                <Card.Text>Following: {item.following.length}</Card.Text>
                <Card.Text>Followers: {item.followers.length}</Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      );
    }
  };

  return (
    <>
      <Container className="feed-container">
        <Row className="justify-content-center">
          <Col>
            {feed.map((item) => (
              <div key={item.id} className="mb-4">
                {renderCard(item)}
              </div>
            ))}
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        {selectedItem && (
          <>
            {selectedItem.title ? (
              // Recipe Modal
              <>
                <Modal.Header closeButton>
                  <Modal.Title>{selectedItem.title}</Modal.Title>
                </Modal.Header>
                {console.log(selectedItem)}
                <Modal.Body>
                  <img src={selectedItem.image.url} alt={selectedItem.title} className="img-fluid mb-4" />
                  <h5>Author</h5>
                  <p>{selectedItem.username}</p>
                  <h5>Average Rating</h5>
                  <p>{selectedItem.averageRating}</p>
                  <h5>Description</h5>
                  <p>{selectedItem.description}</p>
                  <h5>Ingredients</h5>
                  <ul className="list-group list-group-flush">
                    {selectedItem.ingredients.map((ingredient, index) => (
                      <li key={index} className="list-group-item">
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                  <Form.Group controlId="formRating">
                    <h5>Your rating</h5>
                    <Form.Control
                      type="number"
                      placeholder="Enter a number from 1-5"
                      name="rating"
                      value={rating}
                      onChange={handleRateChange}
                    />
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="dark" onClick={handleRate}>
                    Rate
                  </Button>
                  <Button variant="dark" onClick={handleSave}>
                    Save
                  </Button>
                  <Button variant="dark" onClick={handleUnsave}>
                    Unsave
                  </Button>
                  <Button variant="dark" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </>
            ) : (
              // User Modal
              <>
                <Modal.Header closeButton>
                  <Modal.Title>{selectedItem.username}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h5>Following</h5>
                  <p>{selectedItem.following.length}</p>
                  <h5>Followers</h5>
                  <p>{selectedItem.followers.length}</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="dark" onClick={handleFollow}>
                    Follow
                  </Button>
                  <Button variant="dark" onClick={handleUnfollow}>
                    Unfollow
                  </Button>
                  <Button variant="dark" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </>
            )}
          </>
        )}
      </Modal>
    </>
  );
};

export default SearchFeed;