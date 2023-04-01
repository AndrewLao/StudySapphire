// components
import TaskItem from "./TaskItem";

// styles
import "./TaskItemFrame.css"

// Component for the frame containing task items
// Uses TaskItem as a reusable component
export default function TaskItemFrame(props) {
    const title = props.title;
    const itemList = props.taskItemList;

    return (
        <>
            <div className="taskItemFrame">
                <div className="taskItemHeader">
                    { title }
                </div>
                <div className="taskItemWrapper">
                    {itemList.map((item, key) => {
                        
                    }) }
                </div>
            </div>
        </>
    );
}