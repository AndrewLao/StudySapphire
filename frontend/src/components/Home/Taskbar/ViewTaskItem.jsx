import "./ViewTaskItem.css"
import { UserContext } from "../../../App";
import { useContext } from "react";
import EditTask from "./EditTask";
export default function ViewTaskItem(props)
{
    const accentStyle = { backgroundColor: props.color }
    const task = props.task;
    const setSelectedTask = props.setSelectedTask;
    const selectedTask = props.selectedTask
    const taskID = props.taskID
    const healthiness = props.healthiness
    const setInMenu = props.setInMenu
    const inMenu = props.inMenu
    const setPopupMessage = props.setPopupMessage
    const {userData, setUserData} = useContext(UserContext);

    function deleteTaskShortcut(giveTokens)
    {
        let message = deleteTask(taskID, userData, setUserData, selectedTask, setSelectedTask, healthiness, giveTokens)
        setPopupMessage(message)
    }
    return (
            <div className="viewTaskCard">
                <div className="taskAccentColorDiv" style={ accentStyle }>
                    <div className="checkBox" onClick={() => {
                        deleteTaskShortcut(true)

                        }}></div>
                </div>
                <div className="taskMiddleDiv">
                    
                    <div className="taskName">{task.NAME}</div>
                    {task.DUEDATE && <div className="taskDueDate">Due {task.DUEDATE}</div>}
                    {!task.DUEDATE && <div className="taskDueDate">No Due Date</div>}
                </div>
                <div className="taskRightDiv">
                    <img src="/calendar/mdi_pencil.svg" alt="Edit Task" onClick={() => {
                        setSelectedTask(taskID)
                        setInMenu("EDITTASK")
                        console.log(inMenu)
                    }}/>
                </div>
                {(selectedTask == taskID) && (inMenu == "EDITTASK") && <EditTask inMenu={inMenu} setInMenu={setInMenu} taskID={selectedTask} deleteTask={deleteTaskShortcut}/>}
                
            </div>
            
    );
}

function deleteTask(taskID, userData, setUserData, selectedTask, setSelectedTask, healthiness, giveTokens)
{
    
    let userCopy = JSON.parse(JSON.stringify(userData));
    let responsibilityID = userCopy.TASKS[taskID].RESPONSIBILITY;
    let respTasks = userCopy.RESPONSIBILITIES[responsibilityID].TASKS
    let slots = 0
    respTasks.splice(respTasks.indexOf(taskID), 1)
    delete userCopy.TASKS[taskID]
    Object.keys(userCopy.SCHEDULEDTIME).forEach((day) => {
        let times = userCopy.SCHEDULEDTIME[day]
        times.forEach((chunk) => {
            if (chunk[2] == taskID)
                slots += chunk[1] - chunk[0] + 1
        })
        userCopy.SCHEDULEDTIME[day] = times.filter(time => time[2] != taskID)
    })
    Object.keys(userCopy.SCHEDULEDTIME).forEach((day) => {
        if (userCopy.SCHEDULEDTIME[day].length == 0)
            delete userCopy.SCHEDULEDTIME[day]
    })
    if (selectedTask == taskID)
        setSelectedTask(0)
    let message = ""
    if (giveTokens)
    {
        let tokensEarned = (slots * healthiness.SCORE / 100)
        userCopy.TOKENS += tokensEarned
        message = "Gave " + (tokensEarned) + " Tokens for " + (slots / 4).toFixed(2) + " hours of work with " + healthiness.SCORE + "% healthiness"
    }
    setUserData(userCopy)
    console.log("MESSAGE IS " + message)
    return message;
}