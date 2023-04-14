import "./TaskItem.css";
import { useState, useEffect } from "react";
export default function TaskItem(props) {
    const accentStyle = { backgroundColor: props.color }
    const task = props.task;
    const setSelectedTask = props.setSelectedTask;
    const selectedTask = props.selectedTask
    const taskID = props.taskID
    const [selectedStyle, setSelectedStyle] = useState({})

    useEffect(() => {
        console.log(taskID, selectedTask)
        if (taskID == selectedTask)
        {
            setSelectedStyle({color: "#ff0000"})
        }
        else
            setSelectedStyle({})
    }, [selectedTask])

    useEffect(() => {
        console.log(selectedStyle)
    }, [selectedStyle])
    return (
            <div className="taskCard" onClick = {() => {setSelectedTask(taskID)}}style = {selectedStyle}>
                <div className="taskAccentColorDiv" style={ accentStyle }>
                </div>
                <div className="taskMiddleDiv">
                    
                    <div className="taskName">{task.NAME}</div>
                    <div className="taskDueDate">Due {task.DUEDATE}</div>
                </div>
                <div className="taskEditButtonDiv">
                    <img src="/calendar/mdi_pencil.svg"></img>
                </div>
            </div>
    );
}