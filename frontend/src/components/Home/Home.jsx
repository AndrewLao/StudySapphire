import TaskView from "./TaskView";
import Calendar from "./Calendar";
import Sidebar from "../Sidebar"
import { useState } from "react";

import "./Home.css";


export default function Home() {
    const [schedulingMode, setSchedulingMode] = useState(false)
    const [selectedTask, setSelectedTask] = useState(0)

    return (
        <>
            <div className="homeContainer">
                <Calendar schedulingMode = {schedulingMode}  setSchedulingMode = {setSchedulingMode} selectedTask = {selectedTask}/>
                <TaskView schedulingMode = {schedulingMode} setSelectedTask = {setSelectedTask}/>
                <Sidebar />
            </div>
        </>
    )
};