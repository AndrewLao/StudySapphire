import TaskView from "./TaskView";
import Calendar from "./Calendar";
import Sidebar from "../Sidebar"
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from '../../App';

import "./Home.css";


export default function Home(props) {
    const getUserData = props.getUserData
    const postUserData = props.postUserData
    const { userData, setUserData } = useContext(UserContext);
    
    
    const [schedulingMode, setSchedulingMode] = useState(false)
    const [selectedTask, setSelectedTask] = useState(0)

    useEffect(() => {
        postUserData()
        console.log("saved user data as")
        console.log(userData)
      }, [userData])
    
    if (userData)
    {
        return (
            <>
                <div className="homeContainer">
                    <Calendar schedulingMode = {schedulingMode}  setSchedulingMode = {setSchedulingMode} selectedTask = {selectedTask}/>
                    <TaskView schedulingMode = {schedulingMode} selectedTask = {selectedTask} setSelectedTask = {setSelectedTask}/>
                    <Sidebar />
                </div>
            </>
        )
    }
    
};