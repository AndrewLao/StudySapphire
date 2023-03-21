import TaskHeader from "./TaskHeader";

import "./TaskView.css";


export default function TaskView () {
    return (
        <>
            <div className="fullTaskview">
                <TaskHeader />
                <div className="taskViewport">
                    <h1>Tasks Here</h1>
                </div>
            </div>
            
        </>
        
    );
}