import "./AddTask.css"
import { useRef } from "react"
import { UserContext } from "../../App";
import { useContext, useState } from "react";
export default function AddTask({inMenu, setInMenu})
{
    const nameRef = useRef();
    const responsibilityRef = useRef();
    const dueDateRef = useRef(); 
    const {userData, setUserData} = useContext(UserContext);
    const [error, setError] = useState(false)
    console.log(userData)
    return (
        <div className="popup">
            <div className="popupHeader">Add Task</div>
            <div className="popupBody">
                <div className="addTaskForm">
                    <div className="addTaskName">
                        <label for="addTaskName">Name:</label>
                        <input type="text" id="addTaskName" placeholder="Homework" ref={nameRef}></input>
                    </div>
                    <div className="addTaskResponsibility">
                        <label for="addTaskResponsibility">Responsibility:</label>
                        <select id="addTaskResponsibility" ref={responsibilityRef}>
                            {
                                userData.RESPONSIBILITYORDER.map((resID, ind) => {
                                    let responsibility = userData.RESPONSIBILITIES[resID];
                                    if (responsibility.NAME == "Miscellaneous")
                                        return ( <option selected value={resID}>{responsibility.NAME}</option> )
                                    return ( <option value={resID}>{responsibility.NAME}</option> )
                                })
                            }
                        </select>
                    </div>
                    <div className="addTaskDueDate"></div>
                        <label for="addTaskDueDate">Due Date:</label>
                        <input type="date" id="addTaskDueDate" ref={dueDateRef}></input>
                </div>
            </div>
            <div className="popupFooter">
                <div className="popupButtons">
                    <button className="saveButton" onClick={() => {
                        let taskName = nameRef.current.value
                        let taskResp = responsibilityRef.current.value
                        let taskDueDate = dueDateRef.current.value
                        if (!taskName || !taskResp || !taskDueDate)
                        {
                            setError(true)
                            return
                        }
                        let userCopy = JSON.parse(JSON.stringify(userData))
                        let taskIDs = Object.keys(userData.TASKS).map((task) => {
                            return parseInt(task, 10)
                        })
                        let nextID = ("" + Math.max(101, (Math.max(...taskIDs) + 1)))
                        userCopy.RESPONSIBILITIES[taskResp].TASKS.push(nextID)
                        let newTask = {
                            NAME: taskName,
                            DUEDATE: taskDueDate,
                            RESPONSIBILITY: taskResp
                        }
                        console.log("Saving...")
                        userCopy.TASKS[nextID] = newTask
                        setUserData(userCopy)
                        setInMenu(false)


                    }}>save</button>
                    <button className="cancelButton" onClick={() => {setInMenu(false)}}>cancel</button>
                </div>
            </div>
            {error && <div className="addTaskError">Invalid Task!</div>}
        </div>
    )
}