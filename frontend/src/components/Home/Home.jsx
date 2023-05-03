import TaskView from "./TaskView";
import Calendar from "./Calendar";
import Sidebar from "../Sidebar"
import { useState } from "react";

import "./Home.css";
import {useContext, useEffect} from "react";
import {usernameContext} from "../../usernameContext.jsx";
import {useNavigate} from "react-router-dom";


export default function Home(props) {
    const userData = props.userData
    const setUserData = props.setUserData
    const [schedulingMode, setSchedulingMode] = useState(false)
    const [selectedTask, setSelectedTask] = useState(0)
    const { username, setUsername } = useContext(usernameContext);
    const navigate = useNavigate();


    useEffect(() => {
        console.log("Current User: ", username);
        if ( username === "" ){
            navigate("/login");
        }
    })

    return (
        <>
            <div className="homeContainer">
                <Calendar schedulingMode = {schedulingMode}  setSchedulingMode = {setSchedulingMode} selectedTask = {selectedTask} userData = {userData} setUserData = {setUserData} />
                <TaskView schedulingMode = {schedulingMode} selectedTask = {selectedTask} setSelectedTask = {setSelectedTask} userData = {userData} setUserData = {setUserData}/>
                <Sidebar />
            </div>
        </>
    )
};