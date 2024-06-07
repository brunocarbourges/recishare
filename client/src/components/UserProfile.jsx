import { useState, useContext } from "react";
import { Button, Card, Modal, Form } from "react-bootstrap";

import "./UserProfile.css"; 
import { UserContext } from "../contexts/userContext";
import { postRecipe } from "../services/postService";

const UserProfile = () => {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const { user } = useContext(UserContext);

  const handleClick = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleImage = (event) => {
    setImage(event.target.files[0]);
  };

  const handleInput = (event) => {
    switch (event.target.name) {
      case "title":
        setTitle(event.target.value);
        break;
      case "description":
        setDescription(event.target.value);
        break;
      case "ingredients":
        // Regex in .replace() matches any punctuation
        setIngredients(event.target.value.replace(/\p{P}/gu, "").split(" "));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    setShow(false);

    if (ingredients.length < 2) {
      alert("You must have at least two ingredients.");
      setImage(null);
      setTitle("");
      setDescription("");
      setIngredients([]);
      return;
    }

    const result = await postRecipe(user.id, image, title, description, ingredients);
    if (result.success) {
      alert(result.message);
    }
    else {
      alert(`Failed to post recipe: ${result.error}`);
    }
    
    // Without this, you will submit repeat data if you resubmit with no input
    setImage(null);
    setTitle("");
    setDescription("");
    setIngredients([]);
  };

  return (
    <>
      <Card className="user-profile-card">
        <Card.Body className="text-center">
          <Card.Title> {user.username} </Card.Title>
          <Card.Text> Followers: {user.followers.length} | Following: {user.following.length} </Card.Text>
          <Card.Text> Member since: {user.createdAt.slice(0, 10)} </Card.Text>
          <Button variant="dark" onClick={handleClick}> + </Button>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Post a recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="image" onChange={handleImage} />
            </Form.Group>

            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" name="title" onChange={handleInput} />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter description" name="description" onChange={handleInput} />
            </Form.Group>

            <Form.Group controlId="formIngredients">
              <Form.Label>Ingredients</Form.Label>
              <Form.Control type="text" placeholder="Enter ingredients" name="ingredients" onChange={handleInput} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserProfile;