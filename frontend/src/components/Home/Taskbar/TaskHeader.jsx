import "./TaskHeader.css";


export default function TaskHeader({inMenu, setInMenu}) {

    return (
        <>
            <div className="taskHeader">
                Tasks
                <div className="addButtons">
                <div className="taskButtonContainer" onClick={() => { setInMenu("ADDTASK") }}>
                    <div></div>
                    <div className="taskButtonPlusIcon">Add Task</div>
                    <div className="taskButtonPlusIcon">+</div>
                </div>
                <div className="responsibilityButtonContainer" onClick={() => { setInMenu("ADDRESPONSIBILITY") }}>
                    <div></div>
                    <div className="responsibilityButtonPlusIcon">Add Responsibility</div>
                    <div className="responsibilityButtonPlusIcon">+</div>
                </div>
                </div>
                
            </div>
        </>
    );
}