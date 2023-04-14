// packages
import { useState, useRef, useEffect, createContext} from 'react';
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

const [userData, setUserData] = useState({})

// context global states
const UserContext = createContext();

function App() {


  useEffect(() => {
    api.post("/dummyWrite", userData
    ).then((res) => {
      console.log(res);
    })
  }, [userData])
  
  function getUserData() {
    api.get("/dummyRead", { params: {fname: "test.json"} }).then(res => {
      if (res.status == 500)
        console.log("uh oh!! pull from db didnt work :((")
      else
        setUserData(res)
    })
  }
  

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
        <UserContext.Provider value={userData}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={ <Register /> } />
            <Route path="/home" element={wrapNavbar(<Home />)} />
            <Route path="*" element={<NotFound />}></Route>
            <Route path="/*" element={ <NotFound /> }></Route>
          </Routes> 
        </UserContext.Provider>
        
      </div>
    </>
  )
}

export default App
