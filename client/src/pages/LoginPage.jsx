import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

import logo from "../assets/recishare.png";
import { UserContext } from "../contexts/userContext";
import ScrollReveal from 'scrollreveal';


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
    <div className="login-register-container">
      <h2>Welcome to ReciShare</h2>
      <img src={logo} alt="ReciShare logo" width={250} height={250} />
      <div className="tab">
        <button onClick={() => setActiveTab("login")} className={activeTab === "login" ? "active" : ""}>Login</button>
        <button onClick={() => setActiveTab("register")} className={activeTab === "register" ? "active" : ""}>Register</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        </div>
        <div>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        </div>
        <button type="submit">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</button>
      </form>
    </div>
  );
}

export default LoginPage;