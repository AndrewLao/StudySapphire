import "./TaskItem.css";

export default function TaskItem(props) {
    const style = { backgroundColor: props.color }
    const task = props.task;
    const setSelectedTask = props.setSelectedTask;
    const taskID = props.taskID
    return (
        <>
            <div className="taskCard">
                <div className="taskAccentColorDiv" style={ style }>
                    <div>
                    <button onClick={() => {setSelectedTask(taskID)}}></button>
                    </div>
                </div>
                <div className="taskMiddleDiv">
                    
                    <div className="taskName">{task.NAME}</div>
                    <div className="taskDueDate">Due {task.DUEDATE}</div>
                </div>
                <div className="taskEditButtonDiv">
                    <img src="/calendar/mdi_pencil.svg"></img>
                </div>
            </div>
        </>
    );
}