import { useState, useContext, useEffect } from "react";
import ScrollReveal from "scrollreveal";
import { Card, Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import { rateRecipe, saveRecipe, unsaveRecipe } from "../services/saveRateService.js";

import { UserContext } from "../contexts/userContext";
import { getUserRecipes } from "../services/userPostService";
import "./UserRecipes.css";


const UserRecipes = () => {
  const [show, setShow] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [userRecipes, setUserRecipes] = useState([]);
  const [rating, setRating] = useState(''); // State to store the rating
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchUserRecipes = async () => {
      const feed = await getUserRecipes(user.id);
      if (feed.success) {
        setUserRecipes(feed.data);
      } else {
        console.error(feed.error);
      }
    };

    fetchUserRecipes();
  }, [user.id]);

  const handleClose = () => setShow(false);
  const handleShow = (recipe) => {
    setSelectedRecipe(recipe);
    setShow(true);
  };

  const handleSave = async () => {
    if (selectedRecipe) {
      const result = await saveRecipe(user.id, selectedRecipe._id);
      if (result.success) {
        alert("Recipe saved successfully!");
      }
    }
  };

  const handleUnsave = async () => {
    if (selectedRecipe) {
      const result = await unsaveRecipe(user.id, selectedRecipe._id);
      if (result.success) {
        alert("Recipe unsaved successfully!");
      }
    }
  };

  const handleRateChange = (event) => {
    setRating(event.target.value); // Capture the rating value
  };

  const handleRate = async () => {
    if (selectedRecipe) {
      const numericRating = Number(rating); // Convert rating to a number
      if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
        alert("Please enter a valid rating between 1 and 5.");
        return;
      }
      const result = await rateRecipe(user.id, selectedRecipe._id, numericRating); // Pass the rating value
      if (result.success) {
        alert("Recipe rated successfully!");
      }
    }
  };
  
  const sr = ScrollReveal({
    origin: "top",
    duration: 1000,
    distance: '30px',
    reset: true,
  });

  sr.reveal(".mb-5", {
    interval: 200,
  });

	return (
		<>
		<Container className="feed-container">
      {userRecipes.reduce((rows, recipe, index) => {
        if (index % 2 === 0) {
          rows.push([recipe]);
        } else {
          rows[rows.length - 1].push(recipe);
        }
        return rows;
      }, []).map((row, rowIndex) => (
        <Row key={rowIndex} className="justify-content-center mb-4">
          {row.map((recipe) => (
            <Col key={recipe.id} md={6} className="d-flex">
              <Card onClick={() => handleShow(recipe)} style={{ cursor: 'pointer' }} className="w-100">
                <Row className="align-items-stretch">
                  <Col className="custom-card-img-wrapper">
                    <Card.Img src={recipe.image.url} className="custom-card-img-left" />
                  </Col>
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
            </Col>
          ))}
        </Row>
      ))}
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
				<h5>Average Rating</h5>
				<p>{selectedRecipe.averageRating}</p>
				<Form.Group controlId="formRating">
					<h5>Rating</h5>
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
				<Button variant="secondary" onClick={handleRate}>
					Rate
				</Button>
				<Button variant="secondary" onClick={handleSave}>
					Save
				</Button>
				<Button variant="secondary" onClick={handleUnsave}>
					Unsave
				</Button>
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

export default UserRecipes;