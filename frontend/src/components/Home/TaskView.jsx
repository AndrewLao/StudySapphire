// libraries
// temporary json import until backend is implemented
import data from "../../SampleTasks.json";

// components
import TaskHeader from "./TaskHeader";
import Responsibility from "./Responsibility";

// styles
import "./TaskView.css";


// uses TaskItemFrame as a reusable component
export default function TaskView() {
    return (
        <>
            <div className="fullTaskview">
                <div className="timer">Timer Goes Here</div>
                <TaskHeader />
                <div className="taskViewport">
                    {data.RESPONSIBILITIES.map((r, key) => {
                        return (
                            <Responsibility responsibility={r} key={ data.RESPONSIBILITIES.ID } />
                        )
                    })}
                </div>
            </div>
            
        </>
        
    ); 
}