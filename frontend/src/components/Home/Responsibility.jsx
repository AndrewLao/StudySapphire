// components
import TaskItem from "./TaskItem";

// styles
import "./Responsibility.css"

// Component for the frame containing task items
// Uses TaskItem as a reusable component

function showTasks(responsibility, tasks, setSelectedTask) {
    if (responsibility.TASKS.length == 0) {
        return noTasks()
    }
    return (
        responsibility.TASKS.map((t) => {
        return (
            <TaskItem task={tasks[t]} key={t} color={responsibility.COLOR} setSelectedTask = {setSelectedTask} taskID = {t}/>
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
    const tasks = props.tasks;
    const schedulingMode = props.schedulingMode;
    const setSelectedTask = props.setSelectedTask;
    return (
        <>
            <div className="taskItemFrame">
                <div className="taskItemHeader">
                    { responsibility.NAME }
                </div>
                <div className="taskItemWrapper">
        
                    {showTasks(responsibility, tasks, setSelectedTask)}
                </div>
            </div>
        </>
    );
}