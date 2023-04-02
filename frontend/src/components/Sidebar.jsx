import "./Sidebar.css"

export default function Sidebar() {
    return (
        <div className="Sidebar">
            {generateButton("Task Scheduler", "calendar", null)}
            {generateButton("My Town", "town", null)}
            {generateButton("Profile", "profile", null)}
            {generateButton("Account Settings", "settings", null)}
            <button className="SignOut"><p>Sign Out</p></button>
        </div>
    )
    
}


function generateButton(title, icon, func)
{
    return (
        <button className="SidebarOption" onClick={func}>
            <img src={"../../public/sidebar/" + icon + ".svg"}></img>
            <p>{title}</p>
        </button>
    )
}