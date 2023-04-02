import "./TaskItem.css";

export default function TaskItem(props) {
    const style = { backgroundColor: props.color }
    const task = props.task;
    return (
        <>
            <div className="taskCard">
                <div className="taskAccentColorDiv" style={ style }></div>
                <div className="taskMiddleDiv">
                    
                    <div className="taskName">{task.NAME}</div>
                    <div className="taskDueDate">{task.DUE_DATE}</div>
                </div>
                <div className="taskEditButtonDiv">
                    <img src="/calendar/mdi_pencil.svg"></img>
                </div>
            </div>
        </>
    );
}