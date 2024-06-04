import React from 'react';
import AppNavbar from './components/Navbar';
import HomePage from './components/HomePage';
import './components/HomePage.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <AppNavbar /> 
      <HomePage />
    </>
  );
}

export default App;