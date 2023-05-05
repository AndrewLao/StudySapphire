// components
import EditTaskItem from "./EditTaskItem";
import ViewTaskItem from "./ViewTaskItem";

// styles
import "./Responsibility.css"

// Component for the frame containing task items
// Uses TaskItem as a reusable component

function showTasks(responsibility, tasks, setSelectedTask, selectedTask, schedulingMode) {
    if (responsibility.TASKS.length == 0) {
        return noTasks()
    }
    if (!schedulingMode)
    {
        return (
        responsibility.TASKS.map((t) => {
            return (
                <ViewTaskItem task={tasks[t]} key={t} color={responsibility.COLOR} selectedTask = {selectedTask} setSelectedTask = {setSelectedTask} taskID = {t}/>
                )
            })
    )}
    return (
        responsibility.TASKS.map((t) => {
        return (
            <EditTaskItem task={tasks[t]} key={t} color={responsibility.COLOR} selectedTask = {selectedTask} setSelectedTask = {setSelectedTask} taskID = {t}/>
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
    const selectedTask = props.selectedTask
    return (
        <>
            <div className="taskItemFrame">
                <div className="taskItemHeader">
                    { responsibility.NAME }
                </div>
                <div className="taskItemWrapper">
        
                    {schedulingMode && showTasks(responsibility, tasks, setSelectedTask, selectedTask, true)}
                    {!schedulingMode && showTasks(responsibility, tasks, setSelectedTask, selectedTask, false)}
                </div>
            </div>
        </>
    );
}