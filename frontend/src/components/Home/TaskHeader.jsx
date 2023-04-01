import "./TaskHeader.css";


export default function TaskHeader() {
    return (
        <>
            <div className="taskHeader">
                Tasks
                <div className="taskButtonContainer" onClick={() => { console.log("it worky") }}>
                    <div className="taskButtonFiller"></div>
                    <div className="taskButtonPlusIcon">Add Task</div>
                    <div className="taskButtonPlusIcon">+</div>
                </div>
                
            </div>
        </>
    );
}