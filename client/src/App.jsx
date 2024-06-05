import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

import "./App.css";
import logo from "./assets/recishare.png";


function App() {
  const [userData, setUserData] = useState("");
  const [activeTab, setActiveTab] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Other components need data about the user to display information, userData is passed as prop
  const getUserData = async (id) => {
    try {
      const response = await fetch(`http://localhost:5050/user/${id}`);
      const data = await response.json();
      
      if (response.ok) {
        setUserData(data);
      } else {
        console.log(`Failed to get user data: ${data.error}`);
      }
    } 
    catch (error) {
      console.log("Error in getUserData():", error);
    }
  };

  // Handles login/registration based on the active tab
  const handleAuth = async (event) => {
    event.preventDefault();
  
    const url = `http://localhost:5050/auth/${activeTab}`;
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        getUserData(data.id);
        navigate("/home");
      } else {
        alert(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} failed: ${data.error}`);
      }
    }
    catch (error) {
      console.log("Error in handleAuth():", error);
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
      <form onSubmit={handleAuth}>
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

export default App;