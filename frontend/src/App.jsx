import { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from './components/Banner';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import './App.css';

function App() {

  // function to add navBar to pages
  // Needed to make sure that the login and register pages does not have a navBar
  const wrapNavbar = () => {
    return (
      <>
        <Banner />
      </>
    )
  }
  
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={ <Register /> } />
          <Route path="/home" element={wrapNavbar(<Home />)} />
        </Routes>
      </div>
    </>
  )
}

export default App
