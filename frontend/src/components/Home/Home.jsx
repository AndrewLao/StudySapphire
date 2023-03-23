import TaskView from "./TaskView";
import Calendar from "./Calendar";
import Sidebar from "../Sidebar"

import "./Home.css";


export default function Home() {
    return (
        <>
            <div className="homeContainer">
                <Calendar />
                <TaskView />
                <Sidebar />
            </div>
        </>
    )
};