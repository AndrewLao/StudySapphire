import TaskView from "./TaskView";
import Calendar from "./Calendar";
import Sidebar from "../Sidebar"

import "./Home.css";
import {useContext, useEffect} from "react";
import {usernameContext} from "../../usernameContext.jsx";
import {useNavigate} from "react-router-dom";


export default function Home() {

    const { username, setUsername } = useContext(usernameContext);

    const navigate = useNavigate();


    useEffect(() => {
        console.log("Current User: ", username);
        if ( username === "" ){
            navigate("/login");
        }
    })

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