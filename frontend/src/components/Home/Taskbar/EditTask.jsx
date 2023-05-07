import "./EditTask.css"
import { useEffect, useRef } from "react"
import { UserContext } from "../../../App";
import { useContext, useState } from "react";
export default function EditTask({inMenu, setInMenu, taskID, deleteTask})
{
    const nameRef = useRef();
    const responsibilityRef = useRef();
    const dueDateRef = useRef(); 
    const {userData, setUserData} = useContext(UserContext);
    const [error, setError] = useState(false)
    const taskData = userData.TASKS[taskID]
    console.log(taskData)
    return (
        <div className="editPopup">
            <div className="editPopupHeader">Edit Task</div>
            <div className="editPopupBody">
                <div className="editTaskForm">
                    <div className="editTaskName">
                        <label for="editTaskName">Name:</label>
                        <input autoFocus type="text" id="editTaskName" defaultValue={taskData.NAME} placeholder="Homework" ref={nameRef}></input>
                    </div>
                    <div className="editTaskResponsibility">
                        <label for="editTaskResponsibility">Responsibility:</label>
                        <select id="editTaskResponsibility" ref={responsibilityRef}>
                            {
                                userData.RESPONSIBILITYORDER.map((resID, ind) => {
                                    let responsibility = userData.RESPONSIBILITIES[resID];
                                    if (resID == taskData.RESPONSIBILITY)
                                        return ( <option selected value={resID}>{responsibility.NAME}</option> )
                                    return ( <option value={resID}>{responsibility.NAME}</option> )
                                })
                            }
                        </select>
                    </div>
                    <div className="editTaskDueDate"></div>
                        <label for="editTaskDueDate">Due Date:</label>
                        <input type="date" id="editTaskDueDate" defaultValue={taskData.DUEDATE} ref={dueDateRef}></input>
                </div>
            </div>
            <div className="editPopupDelete">
                <p onClick={() => {
                    deleteTask(false)
                    setInMenu("NONE")
                }}>Delete this task</p>
            </div>
            <div className="editPopupFooter">
                <div className="editPopupButtons">
                    <button className="saveButton" onClick={() => {
                        let taskName = nameRef.current.value
                        let taskResp = responsibilityRef.current.value
                        let taskDueDate = dueDateRef.current.value
                        if (!taskName || !taskResp)
                        {
                            setError(true)
                            return
                        }
                        if (!taskDueDate)
                            taskDueDate = null
                        let userCopy = JSON.parse(JSON.stringify(userData))
                        let newTask = {
                            NAME: taskName,
                            DUEDATE: taskDueDate,
                            RESPONSIBILITY: taskResp
                        }
                        console.log("Saving...")
                        userCopy.TASKS[taskID] = newTask
                        if (taskData.RESPONSIBILITY != taskResp)
                        {
                            let oldRespTaskList = userCopy.RESPONSIBILITIES[taskData.RESPONSIBILITY].TASKS
                            oldRespTaskList.splice(oldRespTaskList.indexOf(taskID), 1)
                            let newRespTaskList = userCopy.RESPONSIBILITIES[taskResp].TASKS
                            newRespTaskList.push(taskID)
                        }
                       
                        setUserData(userCopy)
                        setInMenu("NONE")


                    }}>Save</button>
                    <button className="cancelButton" onClick={() => {setInMenu("NONE")}}>Cancel</button>
                </div>
            </div>
            {error && <div className="editTaskError">Invalid Task!</div>}
        </div>
    )
}