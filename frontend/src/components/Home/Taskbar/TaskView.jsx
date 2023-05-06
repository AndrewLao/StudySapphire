// libraries
import { useContext } from "react";
import { UserContext } from '../../../App';
// temporary json import until backend is implemented

// components
import TaskHeader from "./TaskHeader";
import Responsibility from "./Responsibility";

// styles
import "./TaskView.css";
import EditAvailability from "./EditAvailability";


// uses TaskItemFrame as a reusable component
export default function TaskView(props) {
    const userData = props.userData;
    const setUserData = props.setUserData;
    const schedulingMode = props.schedulingMode;
    const setSelectedTask = props.setSelectedTask;
    const selectedTask = props.selectedTask;
    const inMenu = props.inMenu;
    const setInMenu = props.setInMenu;
    return (
        <>
            <div className="fullTaskview">
                {!schedulingMode && <div>Timer Goes Here</div>}
                {schedulingMode && <div>Schedule Health Goes Here</div>}
                <TaskHeader inMenu={inMenu} setInMenu={setInMenu}/>
               
                <div className="taskViewport">
                {schedulingMode && <EditAvailability task={selectedTask} setTask={setSelectedTask} 
                editingAvailability={props.editingAvailability} setEditingAvailability={props.setEditingAvailability} />}
                    {userData.RESPONSIBILITYORDER.map((r, key) => {
                        return (
                            <Responsibility responsibility = {userData.RESPONSIBILITIES[r]} tasks = {userData.TASKS} key = {key} 
                            selectedTask = {selectedTask} setSelectedTask = {setSelectedTask} schedulingMode = {schedulingMode} 
                            setEditingAvailability={props.setEditingAvailability}/>
                        )
                    })}
                </div>
            </div>
            
        </>
        
    ); 
}