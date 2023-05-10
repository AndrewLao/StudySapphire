// packages
import { useState, useRef, useEffect, createContext, useMemo } from 'react';
import { BrowserRouter, Routes, Route, json } from "react-router-dom";
import axios from "axios";

// components
import Banner from './components/Banner';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import NotFound from './NotFound';
import Game from './components/Game/Game';
import { SapphireUserDataJSON } from './components/SapphireUserData';
import { checkSession } from './components/Auth/Authorization';

// styles
import './App.css';

// temporary
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const UserContext = createContext();

function App() {
  const [userData, setUserData] = useState(SapphireUserDataJSON);
  // user ID is updated in the Login and Register forms
  // getUserData and postUserData called there 
  // userData is passed via UserContext
  function postUserData() {
    checkSession().then((res) => {
      if (res.idToken.payload.sub != "" && userData.userID != "") {
        api.put("/addOrUpdateUser", userData
      ).then((res) => {
        console.log(res);
      })
      }
    })
  }
  
  // load data if userID exists
  const getUserData = () => {

    checkSession().then((res) => {
      if (res.idToken.payload.sub != "") {
        api.get("/getUserByID", { params: { userID:  res.idToken.payload.sub} }).then(res => {
          if (res.status == 400) {
            console.log(res);
          } else if (res.status == 500) {
            console.log("Server error");
          } else {
            setUserData(res.data);
          }
        });
      }
    }).catch((err) => {
      console.log(err);
      }
    );
  }

  // get healthiness of user's schedule
  const getHealthiness = () => {
    checkSession().then((res) => {
      if (res.idToken.payload.sub != "" && userData.userID != "") {
        api.get("/getHealthiness", { params: { userData: userData } }).then(res => {
          if (res.status == 400) {
            console.log(res);
          } else if (res.status == 500) {
            console.log("Server error");
          } else {
            console.log(res.data);
          }
        })
      } else {
        console.log("Error trying to get health data");
      }
    })
  }

  // function to add navBar to pages
  // Needed to make sure that the login and register pages does not have a navBar
  const wrapNavbar = (item) => {
    return (
      <>
        <Banner includeMenu={ false } tokens={userData ? userData.TOKENS : 100}/>
        { item }
      </>
    )
  }

  return (
    <>
      <div className="App">
        <UserContext.Provider value={{userData, setUserData} }>
          <Routes>
            <Route path="/" element={<Login getUserData={ getUserData } />} />
            <Route path="/login" element={<Login getUserData={ getUserData } />} />
            <Route path="/register" element={ <Register postUserData = {postUserData} /> } />
            <Route path="/home" element={wrapNavbar(<Home getUserData={getUserData} postUserData={postUserData} />)} />
            <Route path="/game" element={<Game getUserData = {getUserData} postUserData = {postUserData}/>} />
            <Route path="*" element={<NotFound />}></Route>
            <Route path="/*" element={ <NotFound /> }></Route>

          </Routes>
        </UserContext.Provider>
        
      </div>
    </>
  )
}

export default App