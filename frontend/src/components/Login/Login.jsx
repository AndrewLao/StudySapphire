import {useContext, useEffect} from "react";
import LoginForm from "./LoginForm";
import LoginHeader from "./LoginHeader";
import LoginInfo from "./LoginInfo";
import "./Login.css"
import {usernameContext} from "../../usernameContext.jsx";

export default function Login(props) {

    const { username, setUsername } = useContext(usernameContext);

    return (<>
        <div className="login-container">
            <div className="login">
                <div className="leftSide">
                    <LoginHeader />
                    <LoginForm />
                </div>
                <div className="rightSide">
                    <LoginInfo/>
                </div>
            </div>
            <div className="footer-wave">
                <img className="wave" src="/wave.svg"></img>
            </div>
        </div>
    </>)
}