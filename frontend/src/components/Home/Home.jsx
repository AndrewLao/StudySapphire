import TaskView from "./TaskView";
import Calendar from "./Calendar";
import Sidebar from "../Sidebar"
import { useState } from "react";

import "./Home.css";


export default function Home(props) {
    const userData = props.userData
    const setUserData = props.setUserData
    const [schedulingMode, setSchedulingMode] = useState(false)
    const [selectedTask, setSelectedTask] = useState(0)


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