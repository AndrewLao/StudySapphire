import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { logout } from "./Auth/Authorization.jsx";
import { SapphireUserDataJSON } from "./SapphireUserData";


export default function Sidebar(props) {

  const navigate = useNavigate();
  const userData = props.userData;
  const setUserData = props.setUserData;
  const setHealthiness = props.setHealthiness;
  
  function logOut() {
    logout();
    setUserData(SapphireUserDataJSON);
    setHealthiness(null);
    navigate("/login");
  }

  return (
    <div className="Sidebar">
      {generateButton("Task Scheduler", "calendar", () => { navigate("/home") })}
      {generateButton("My Town", "town", () => { navigate("/game") })}
      <button className="SignOut" onClick={logOut}>
        <p>Sign Out</p>
      </button>
    </div>
  );
}

function generateButton(title, icon, func) {
  return (
    <button className="SidebarOption" onClick={ func }>
      <img src={"/sidebar/" + icon + ".svg"}></img>
      <p>{title}</p>
    </button>
  );
}

