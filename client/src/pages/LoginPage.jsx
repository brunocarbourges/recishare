import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { Container, Row, Col, Form, Button, Tabs, Tab } from "react-bootstrap";


import logo from "../assets/recishare.png";
import { UserContext } from "../contexts/userContext";
import ScrollReveal from 'scrollreveal';
import 'bootstrap/dist/css/bootstrap.min.css';


const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, register } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const sr = ScrollReveal({
      origin: "top",
      distance: "30px",
      duration: 2000,
      reset: true,
    });


    sr.reveal('.login-register-container', {
      interval: 200,
    });
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (activeTab === "login") {
      const { success, message } = await login(username, password);
      if (success) {
        navigate("/home");
      }
      else {
        console.error(message);
      }
    } 
    else {
      const { success, message } = await register(username, password);
      if (success) {
        navigate("/home");
      }
      else {
        console.error(message);
      }
    }
  };

  return (
    <Container className="login-register-container text-center mt-5">
      <img src={logo} alt="ReciShare logo" className="img-fluid logo my-4" />
      <Tabs 
        id="login-register-tabs"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="justify-content-center"
        fill={true}
      >
        <Tab eventKey="login" title="Login">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </Form.Group>
            <Button className="btn btn-success" type="submit">
              Login
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="register" title="Register">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </Form.Group>
            <Button className="btn btn-success" type="submit">
              Register
            </Button>
          </Form>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default LoginPage;