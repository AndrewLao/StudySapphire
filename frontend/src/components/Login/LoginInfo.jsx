import "./LoginInfo.css"

export default function LoginInfo(props) {
    return (<>
        
        <div className="loginInfo">
            <div className="imageContainer">
                <img src="src/components/assets/calendar.svg"></img>
                <img src="src/components/assets/library.svg"></img>
                <img src="src/components/assets/vector.svg"></img>
            </div>
            <div className="textContainer">
                <p>Manage your daily schedule</p>
                <p>Log short and long-term tasks</p>
                <p>Build a thriving town fueled by your productivity</p>
            </div>
        </div>
        
    </>)
}