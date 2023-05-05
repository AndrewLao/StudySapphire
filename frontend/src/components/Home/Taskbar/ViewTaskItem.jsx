import "./ViewTaskItem.css"
import { useEffect, useState } from "react";
import { UserContext } from "../../../App";
import { useContext } from "react";
export default function ViewTaskItem(props)
{
    const accentStyle = { backgroundColor: props.color }
    const task = props.task;
    const setSelectedTask = props.setSelectedTask;
    const selectedTask = props.selectedTask
    const taskID = props.taskID
    const {userData, setUserData} = useContext(UserContext);
    const [selectedStyle, setSelectedStyle] = useState({})
    // useEffect(() => {
    //     console.log(selectedStyle)
    // }, [selectedStyle])
    return (
            <div className="viewTaskCard">
                <div className="taskAccentColorDiv" style={ accentStyle }>
                    <div className="checkBox" onClick={() => {
                        deleteTask(taskID, userData, setUserData, selectedTask, setSelectedTask)

                        }}></div>
                </div>
                <div className="taskMiddleDiv">
                    
                    <div className="taskName">{task.NAME}</div>
                    <div className="taskDueDate">Due {task.DUEDATE}</div>
                </div>
            </div>
    );
}

function deleteTask(taskID, userData, setUserData, selectedTask, setSelectedTask)
{
    
    let userCopy = JSON.parse(JSON.stringify(userData));
    let responsibilityID = userCopy.TASKS[taskID].RESPONSIBILITY;
    let respTasks = userCopy.RESPONSIBILITIES[responsibilityID].TASKS
    respTasks.splice(respTasks.indexOf(taskID), 1)
    delete userCopy.TASKS[taskID]
    Object.keys(userCopy.SCHEDULEDTIME).forEach((day) => {
        let times = userCopy.SCHEDULEDTIME[day]
        
        userCopy.SCHEDULEDTIME[day] = times.filter(time => time[2] != taskID)
    })
    console.log(userCopy)
    if (selectedTask == taskID)
        setSelectedTask(0)
    setUserData(userCopy)
}