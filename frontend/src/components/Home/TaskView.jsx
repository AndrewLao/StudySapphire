// components
import TaskHeader from "./TaskHeader";
import TaskItemFrame from "./TaskItemFrame";
import TaskItem from "./TaskItem";

// styles
import "./TaskView.css";


// uses TaskItemFrame as a reusable component
export default function TaskView () {
    return (
        <>
            <div className="fullTaskview">
                <TaskHeader />
                <div className="taskViewport">
                    <TaskItemFrame title={ "Testing Title" } />
                </div>
            </div>
            
        </>
        
    ); 
}