// components
import TaskView from "./Taskbar/TaskView";
import Calendar from "./Calendar/Calendar";
import Sidebar from "../Sidebar";
import { checkSession } from "../Auth/Authorization";

// packages
import { useEffect, useState} from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";


// contexts
import { UserContext } from '../../App';

// styles
import "./Home.css";
import AddTask from "./Taskbar/AddTask";
import AddResponsibility from "./Taskbar/AddResponsibility";

export default function Home(props) {
  const getUserData = props.getUserData;
  const postUserData = props.postUserData;
  const { userData, setUserData } = useContext(UserContext);
  const [schedulingMode, setSchedulingMode] = useState(false);
  const [selectedTask, setSelectedTask] = useState(0);
  const [inMenu, setInMenu] = useState("NONE");
  const [editingAvailability, setEditingAvailability] = useState(true);
  const healthiness = props.healthiness;
  const setHealthiness = props.setHealthiness;
  const navigate = useNavigate();

  useEffect(() => {
    checkSession().catch(() => {
      navigate("/login");
    });
    getUserData().catch((err) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    if (userData.userID != "")
    {
      postUserData().then(() => {
        props.getHealthiness().catch((err) => {
          console.log(err);
        })
      }).catch((err) => {
        console.log(err);
      })
    }
  }, [userData]);

  // useEffect(() => {
  //   if (healthiness) {
  //     console.log("healthiness is now")
  //     console.log(healthiness)
  //   }
  // }, [healthiness]);

  if (!(userData.userID == ""))
  {
      return (
        <>
          <div className="homeContainer">
            <Calendar 
            schedulingMode = {schedulingMode}  setSchedulingMode = {setSchedulingMode} selectedTask = {selectedTask} 
            userData = {userData} setUserData = {setUserData} inMenu={inMenu} editingAvailability={editingAvailability}
            />
            <TaskView 
            schedulingMode = {schedulingMode} selectedTask = {selectedTask}
            setSelectedTask = {setSelectedTask} userData = {userData} setUserData = {setUserData} inMenu={inMenu} 
            setInMenu={setInMenu} editingAvailability={editingAvailability} setEditingAvailability={setEditingAvailability}
            healthiness={healthiness}/>
            <Sidebar setUserData={setUserData} getUserData={getUserData} setHealthiness={ setHealthiness } />
            {inMenu == "ADDTASK" && <AddTask inMenu={inMenu} setInMenu={setInMenu}/>}
            {inMenu == "ADDRESPONSIBILITY" && <AddResponsibility setInMenu={setInMenu} /> }
          </div>
        </>
      )
    }
    
};