import TaskView from "./TaskView";
import Calendar from "./Calendar";
import Sidebar from "../Sidebar"

import "./Home.css";
import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import UserPool from "../Auth/UserPool.jsx";
import {checkSession} from "../Auth/Authorization.jsx";


export default function Home() {

    const navigate = useNavigate();

    useEffect(() => {
        checkSession().catch((err) => {
            navigate("/login");
        })
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