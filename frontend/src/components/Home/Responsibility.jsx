// components
import TaskItem from "./TaskItem";

// styles
import "./Responsibility.css"

// Component for the frame containing task items
// Uses TaskItem as a reusable component

function showTasks(responsibility) {
    if (responsibility.TASKS.length == 0) {
        return noTasks()
    }
    return (
        responsibility.TASKS.map((t) => {
        return (
            <TaskItem task={t} key={ t.ID } color={responsibility.COLOR} />
            )
        })
    )
}


function noTasks() {
    return (
        <div className="NoTasks">There are no tasks assigned for this responsibility.</div>
    )
}

export default function TaskItemFrame(props) {
    const responsibility = props.responsibility;
    return (
        <>
            <div className="taskItemFrame">
                <div className="taskItemHeader">
                    { responsibility.NAME }
                </div>
                <div className="taskItemWrapper">
        
                    {showTasks(responsibility)}
                </div>
            </div>
        </>
    );
}