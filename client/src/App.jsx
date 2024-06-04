import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

import "./App.css";
import logo from "./assets/recishare.png";

function App() {
  const [activeTab, setActiveTab] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5050/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/home");
        console.log(data);
      } else {
        alert("Login failed: " + data.error);
      }
    }

    catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="login-register-container">
      <h2>Welcome to ReciShare</h2>
      <img src={logo} alt="ReciShare logo" width={250} height={250} />
      <div className="tab">
        <button onClick={() => setActiveTab('login')} className={activeTab === 'login' ? 'active' : ''}>Login</button>
        <button onClick={() => setActiveTab('register')} className={activeTab === 'register' ? 'active' : ''}>Register</button>
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

export default App;