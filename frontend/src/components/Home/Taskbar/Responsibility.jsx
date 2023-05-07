// components
import EditTaskItem from "./EditTaskItem";
import ViewTaskItem from "./ViewTaskItem";
import { UserContext } from "../../../App";
import { useContext } from "react";

// styles
import "./Responsibility.css"

import { useEffect, useState } from "react";
import AddResponsibility from "./AddResponsibility";


// Component for the frame containing task items
// Uses TaskItem as a reusable component

function showTasks(responsibility, tasks, setSelectedTask, selectedTask, schedulingMode, healthiness, setInMenu, inMenu, setPopupMessage) {
    if (!schedulingMode)
    {
        return (
        responsibility.TASKS.map((t) => {
            return (
                <ViewTaskItem task={tasks[t]} key={t} color={responsibility.COLOR} 
                selectedTask = {selectedTask} setSelectedTask = {setSelectedTask} taskID = {t} healthiness={healthiness} 
                setInMenu={setInMenu} inMenu={inMenu} setPopupMessage={setPopupMessage}/>
                )
            })
    )}
    return (
        responsibility.TASKS.map((t) => {
        return (
            <EditTaskItem task={tasks[t]} key={t} color={responsibility.COLOR} selectedTask = {selectedTask} setSelectedTask = {setSelectedTask} taskID = {t}/>
            )
        })
    )
}

export default function TaskItemFrame(props) {
    const responsibility = props.responsibility;
    const tasks = props.tasks;
    const schedulingMode = props.schedulingMode;
    const setSelectedTask = props.setSelectedTask;
    const selectedTask = props.selectedTask;
    const healthiness = props.healthiness;
    const inMenu = props.inMenu;
    const setInMenu = props.setInMenu;
    const respID = props.respID;
    const setPopupMessage = props.setPopupMessage
    const {userData, setUserData} = useContext(UserContext);

    let hasTasks = true
    if (responsibility.TASKS.length == 0)
        hasTasks = false


    function deleteResponsibility() {
        let userCopy = JSON.parse(JSON.stringify(userData));
        delete userCopy.RESPONSIBILITIES[respID]
        userCopy.RESPONSIBILITYORDER = userCopy.RESPONSIBILITYORDER.filter(id => id != respID)
        setUserData(userCopy)
    }

    
    return (
        <>
            <div className="taskItemFrame">
                <div className="taskItemHeader">
                    { responsibility.NAME }
                    
                </div>
                <div className="taskItemWrapper">
                    {!hasTasks && <div className="NoTasks">There are no tasks assigned for this responsibility.</div>}
                    {!hasTasks && (respID != 100) && <div className="deleteResp"><p onClick={() => {deleteResponsibility()}}>Delete</p></div>}
                    {schedulingMode && hasTasks && showTasks(responsibility, tasks, setSelectedTask, selectedTask, true, healthiness, setInMenu, inMenu, setPopupMessage)}
                    {!schedulingMode && hasTasks && showTasks(responsibility, tasks, setSelectedTask, selectedTask, false, healthiness, setInMenu, inMenu, setPopupMessage)}
                </div>
            </div>
        </>
    );
}