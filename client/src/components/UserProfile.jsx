import { useState, useContext } from "react";
import { Button, Row, Card, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./UserProfile.css"; 
import { UserContext } from "../contexts/userContext";
import { postRecipe } from "../services/postService";

const UserProfile = () => {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  }

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
        setIngredients(event.target.value.replace(/(?!\/)\p{P}/gu, ",").split(","));
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
      alert("Recipe posted successfully!");
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
          <div className="PostButton"> 
            <Button variant="dark" onClick={handleShow}> + </Button>
          </div>
          <div className="LogoutButton">
          < Button variant="dark" onClick={handleLogout}> Logout </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Post a recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formImage" className="form-group-padded">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="image" onChange={handleImage} />
            </Form.Group>

            <Form.Group controlId="formTitle" className="form-group-padded">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" name="title" onChange={handleInput} />
            </Form.Group>

            <Form.Group controlId="formDescription" className="form-group-padded">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter description" name="description" onChange={handleInput} />
            </Form.Group>

            <Form.Group controlId="formIngredients" className="form-group-padded">
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