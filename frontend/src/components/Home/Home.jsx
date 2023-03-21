import TaskView from "./TaskView";
import Calendar from "./Calendar";

import "./Home.css";


export default function Home() {
    return (
        <>
            <div className="homeContainer">
                <Calendar />
                <TaskView />
            </div>
        </>
    )
};