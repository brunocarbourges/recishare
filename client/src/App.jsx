import React from 'react';
import RecipeFeed from './components/RecipeFeed';
import UserProfile from './components/UserProfile';
import HomePage from './components/HomePage';
import './components/HomePage.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <div className="header">
        <h1>Recipe Feed</h1>
      </div>
      <HomePage />
    </>
  );
}

export default App;