// libraries
import { useContext, useRef, useState, useEffect } from "react";
import { UserContext } from '../../../App';
// temporary json import until backend is implemented

// components
import TaskHeader from "./TaskHeader";
import Responsibility from "./Responsibility";

// styles
import "./TaskView.css";
import EditAvailability from "./EditAvailability";
import ScheduleHealth from "./ScheduleHealth";


// uses TaskItemFrame as a reusable component
export default function TaskView(props) {
    const userData = props.userData;
    const setUserData = props.setUserData;
    const schedulingMode = props.schedulingMode;
    const setSelectedTask = props.setSelectedTask;
    const selectedTask = props.selectedTask;
    const inMenu = props.inMenu;
    const setInMenu = props.setInMenu;
    const healthiness = props.healthiness
    const [vpSize, setVpSize] = useState(500)
    const viewportRef = useRef();
    const [popupMessage, setPopupMessage] = useState("")
    const popupTimerRef = useRef();

    function resizeAll()
    {
        if (!viewportRef.current)
            setVpSize(500)
        else
            setVpSize(window.innerHeight - viewportRef.current.offsetTop - 10);
    }

    window.addEventListener("resize", () => {
        resizeAll();
      });

    useEffect(() => {
        resizeAll();
    }, [viewportRef, schedulingMode])

    useEffect(() => {
        clearTimeout(popupTimerRef.current)
        popupTimerRef.current = setTimeout(() => {setPopupMessage("")}, 5000)
    }, [popupMessage])

    return (
        <>
        
            <div className="fullTaskview">
                
                <ScheduleHealth healthiness={healthiness}/>
                <TaskHeader inMenu={inMenu} setInMenu={setInMenu}/>
                <div className="taskViewport" ref={viewportRef} style={{height: vpSize}}>
                    {schedulingMode && <EditAvailability task={selectedTask} setTask={setSelectedTask} 
                    editingAvailability={props.editingAvailability} setEditingAvailability={props.setEditingAvailability} />}
                        {userData.RESPONSIBILITYORDER.map((r, key) => {
                            return (
                                <Responsibility respID={r} responsibility = {userData.RESPONSIBILITIES[r]} tasks = {userData.TASKS} key = {key} 
                                selectedTask = {selectedTask} setSelectedTask = {setSelectedTask} schedulingMode = {schedulingMode} 
                                setEditingAvailability={props.setEditingAvailability} healthiness={healthiness} setInMenu={setInMenu} inMenu={inMenu}
                                setPopupMessage={setPopupMessage}/>
                            )
                        })}
                </div>
                {(popupMessage != "" && <div className="earnedTokensPopup">{popupMessage}</div>)}
            </div>
            
        </>
        
    ); 
}