// packages
import { useState, useRef, useEffect, createContext, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Banner from './components/Banner';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import NotFound from './NotFound';

// styles
import './App.css';

function App() {

  // function to add navBar to pages
  // Needed to make sure that the login and register pages does not have a navBar
  const wrapNavbar = (item) => {
    return (
      <>
        <Banner />
        { item }
      </>
    )
  }
  
  return (
    <>
      <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={ <Register /> } />
            <Route path="/home" element={wrapNavbar(<Home />)} />
            <Route path="*" element={<NotFound />}></Route>
            <Route path="/*" element={ <NotFound /> }></Route>

          </Routes>
      </div>
    </>
  )
}

export default App
