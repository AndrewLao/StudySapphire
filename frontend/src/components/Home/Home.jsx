// components
import TaskView from "./Taskbar/TaskView";
import Calendar from "./Calendar/Calendar";
import Sidebar from "../Sidebar";

// packages
import { useEffect, useState} from "react";
import { useContext } from "react";
import {useNavigate} from "react-router-dom";

// contexts
import { UserContext } from '../../App';
import {usernameContext} from "../../usernameContext.jsx";

// styles
import "./Home.css";
import AddTask from "./Taskbar/AddTask";

export default function Home(props) {
    const getUserData = props.getUserData
    const postUserData = props.postUserData
    const { userData, setUserData } = useContext(UserContext);
    const [schedulingMode, setSchedulingMode] = useState(false)
    const [selectedTask, setSelectedTask] = useState(0)
    const [inMenu, setInMenu] = useState(false);
    const [editingAvailability, setEditingAvailability] = useState(true)
    const [healthiness, setHealthiness] = useState(null)

    const { username, setUsername } = useContext(usernameContext);
    const navigate = useNavigate();


    function getHealthiness(proposedData) {
        setHealthiness({
          "SCORE": Math.floor(Math.random() * 100),
          "PROBLEMS": [
            [
              "You are working too much in one sitting (>2 hours) on 5/8/2023",
              Math.floor(Math.random() * -5)
            ],
            [
              "You have too much work on 5/10/2023",
              Math.floor(Math.random() * -5)
            ],
            [
              "You have \"Homework 1\" scheduled on or after its due date but i want this to be a really long reason so here's some text",
              Math.floor(Math.random() * -5)
            ]
          ]
        })
      }
    
    // comment this useEffect out if you want to test without a users
    useEffect(() => {
        // console.log("Current User: ", username);
        if (username === "") {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        if (userData)
        {
            postUserData();
            console.log("saved user data as");
            console.log(userData);
            getHealthiness(userData)
        }
        
    }, [userData]);

    useEffect(() => {
        if (healthiness)
        {
            console.log("healthiness is now")
            console.log(healthiness)
        }
        
    }, [healthiness])



    useEffect(() => {
        getUserData();
    }, []);


    if (userData)
    {
        return (
            <>
                <div className="homeContainer">
                    <Calendar 
                    schedulingMode = {schedulingMode}  setSchedulingMode = {setSchedulingMode} selectedTask = {selectedTask} 
                    userData = {userData} setUserData = {setUserData} inMenu={inMenu} editingAvailability={editingAvailability}
                    />
                    <TaskView 
                    schedulingMode = {schedulingMode} selectedTask = {selectedTask}
                    setSelectedTask = {setSelectedTask} userData = {userData} setUserData = {setUserData} inMenu={inMenu} 
                    setInMenu={setInMenu} editingAvailability={editingAvailability} setEditingAvailability={setEditingAvailability}
                    healthiness={healthiness}/>
                    <Sidebar />
                    {inMenu && <AddTask inMenu={inMenu} setInMenu={setInMenu}/>}
                </div>
            </>
        )
    }

    // return (
    //     <>
    //         <div className="homeContainer">
    //             <Calendar schedulingMode = {schedulingMode}  setSchedulingMode = {setSchedulingMode} selectedTask = {selectedTask} userData = {userData} setUserData = {setUserData} />
    //             <TaskView schedulingMode = {schedulingMode} selectedTask = {selectedTask} setSelectedTask = {setSelectedTask} userData = {userData} setUserData = {setUserData}/>
    //             <Sidebar />
    //         </div>
    //     </>
    // )
    
    
};