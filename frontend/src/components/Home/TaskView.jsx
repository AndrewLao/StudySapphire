// libraries
// temporary json import until backend is implemented

// components
import TaskHeader from "./TaskHeader";
import Responsibility from "./Responsibility";

// styles
import "./TaskView.css";


// uses TaskItemFrame as a reusable component
export default function TaskView(props) {
    const data = props.userData
    const schedulingMode = props.schedulingMode
    const setSelectedTask = props.setSelectedTask
    const selectedTask = props.selectedTask
    return (
        <>
            <div className="fullTaskview">
                <div className="timer">Timer Goes Here</div>
                <TaskHeader />
                <div className="taskViewport">
                    {data.RESPONSIBILITYORDER.map((r) => {
                        return (
                            <Responsibility responsibility = {data.RESPONSIBILITIES[r]} tasks = {data.TASKS} key = {r} 
                            selectedTask = {selectedTask} setSelectedTask = {setSelectedTask} schedulingMode = {schedulingMode} />
                        )
                    })}
                </div>
            </div>
            
        </>
        
    ); 
}