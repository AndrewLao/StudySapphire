// packages
import { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

// components
import Banner from './components/Banner';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import NotFound from './NotFound';

// styles
import './App.css';

// temporary
const api = axios.create({
baseURL: `http://localhost:3001`
})

function App() {

  // test api post
  // api.post("/dummyWrite", {
  //   test: "hello world",
  //   body: "this is a sample body"
  // }).then((res) => {
  //   console.log(res);
  // })

  api.get("/dummyRead", { params: {fname: "test.json"} }).then(res => {
    console.log(res);
  })

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
