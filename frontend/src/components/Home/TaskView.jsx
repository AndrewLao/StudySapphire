// libraries
// temporary json import until backend is implemented
import data from "../../SampleTasks.json";

// components
import TaskHeader from "./TaskHeader";
import Responsibility from "./Responsibility";

// styles
import "./TaskView.css";


// uses TaskItemFrame as a reusable component
export default function TaskView(props) {
    const schedulingMode = props.schedulingMode
    const setSelectedTask = props.setSelectedTask
    return (
        <>
            <div className="fullTaskview">
                <div className="timer">Timer Goes Here</div>
                <TaskHeader />
                <div className="taskViewport">
                    {data.RESPONSIBILITYORDER.map((r) => {
                        return (
                            <Responsibility responsibility = {data.RESPONSIBILITIES[r]} tasks = {data.TASKS} key = {r} setSelectedTask = {setSelectedTask} schedulingMode = {schedulingMode} />
                        )
                    })}
                </div>
            </div>
            
        </>
        
    ); 
}