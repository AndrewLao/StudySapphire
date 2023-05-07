import "./Sidebar.css";
import { useContext } from "react";
import { usernameContext } from "../usernameContext.jsx";
import { useNavigate } from "react-router-dom";


export default function Sidebar() {
  const { username, setUsername } = useContext(usernameContext);

  const navigate = useNavigate();

  function logOut() {
    setUsername("");
    window.location.reload(false);
  }

  return (
    <div className="Sidebar">
      {generateButton("Task Scheduler", "calendar", () => { navigate("/home") })}
      {generateButton("My Town", "town", () => { navigate("/game") })}
      {generateButton("Profile", "profile", null)}
      {generateButton("Account Settings", "settings", null)}
      <button className="SignOut" onClick={logOut}>
        <p>Sign Out</p>
      </button>
    </div>
  );
}

function generateButton(title, icon, func) {
  return (
    <button className="SidebarOption" onClick={ func }>
      <img src={"../../public/sidebar/" + icon + ".svg"}></img>
      <p>{title}</p>
    </button>
  );
}

