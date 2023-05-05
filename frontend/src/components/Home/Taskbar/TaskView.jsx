// libraries
import { useContext } from "react";
import { UserContext } from '../../../App';
// temporary json import until backend is implemented

// components
import TaskHeader from "./TaskHeader";
import Responsibility from "./Responsibility";

// styles
import "./TaskView.css";


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
                {schedulingMode && <div>Edit availability Goes Here</div>}
                <div className="taskViewport">
                    {userData.RESPONSIBILITYORDER.map((r, key) => {
                        return (
                            <Responsibility responsibility = {userData.RESPONSIBILITIES[r]} tasks = {userData.TASKS} key = {key} 
                            selectedTask = {selectedTask} setSelectedTask = {setSelectedTask} schedulingMode = {schedulingMode} />
                        )
                    })}
                </div>
            </div>
            
        </>
        
    ); 
}