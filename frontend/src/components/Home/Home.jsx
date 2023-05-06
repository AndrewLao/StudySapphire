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

    const { username, setUsername } = useContext(usernameContext);
    const navigate = useNavigate();

    // comment this useEffect out if you want to test without a users
    useEffect(() => {
        // console.log("Current User: ", username);
        if (username === "") {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        postUserData();
        console.log("saved user data as");
        console.log(userData);
    }, [userData]);

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
                    userData = {userData} setUserData = {setUserData} inMenu={inMenu} editingAvailability={editingAvailability}/>
                    <TaskView 
                    schedulingMode = {schedulingMode} selectedTask = {selectedTask} 
                    setSelectedTask = {setSelectedTask} userData = {userData} setUserData = {setUserData} inMenu={inMenu} 
                    setInMenu={setInMenu} editingAvailability={editingAvailability} setEditingAvailability={setEditingAvailability}
                    />
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