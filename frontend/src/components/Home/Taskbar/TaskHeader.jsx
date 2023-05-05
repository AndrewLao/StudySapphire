import "./TaskHeader.css";


export default function TaskHeader({inMenu, setInMenu}) {

    return (
        <>
            <div className="taskHeader">
                Tasks
                <div className="taskButtonContainer" onClick={() => { setInMenu(!inMenu) }}>
                    <div className="taskButtonFiller"></div>
                    <div className="taskButtonPlusIcon">Add Task</div>
                    <div className="taskButtonPlusIcon">+</div>
                </div>
                
            </div>
        </>
    );
}