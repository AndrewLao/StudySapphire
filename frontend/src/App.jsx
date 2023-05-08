// packages
import { useState, useRef, useEffect, createContext, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import sampleData from "./SampleTasks.json";

// components
import Banner from './components/Banner';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import NotFound from './NotFound';
import Game from './components/Game/Game';

// styles
import './App.css';

// temporary
const api = axios.create({
baseURL: `http://localhost:3001`
})

export const UserContext = createContext();

function App() {
  const [userData, setUserData] = useState(undefined);



  function postUserData() {
    if (userData)
    {
        api.post("/dummyWrite", userData
      ).then((res) => {
        // console.log(res);
      })
    }
  }
  
  const getUserData = () => {
    api.get("/dummyRead", { params: { fname: "test.json" } }).then(res => {
      if (res.status == 500) {
        console.log("uh oh!! pull from db didnt work :((")
      }
      else {
        setUserData(res.data);
      }
    })
  }

  useEffect(() => {
    getUserData();
  }, []);
  
  // test if this useEffect causes data to be set to undefined
  // useEffect(() => {
  //   postUserData()
  //   console.log("saved user data as")
  //   console.log(userData)
  // }, [userData])

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
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={ <Register /> } />
            <Route path="/home" element={wrapNavbar(<Home getUserData = {getUserData} postUserData = {postUserData}/>)} />
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