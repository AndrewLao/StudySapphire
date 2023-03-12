import { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from './components/Banner';
import Login from './components/Login/Login';
import Agenda from './components/Agenda/Agenda';
import Register from './components/Register/Register';
import './App.css';


function App() {
  
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={ <Register /> } />
          <Route path="/home" element={<Agenda />} />
        </Routes>
      </div>
    </>
  )
}

export default App
