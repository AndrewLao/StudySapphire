import { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from './components/Banner';
import Login from './components/Login/Login';
import Home from './components/Agenda/Home';
import Register from './components/Register/Register';
import './App.css';


function App() {
  
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={ <Register /> } />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </>
  )
}

export default App
