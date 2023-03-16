import { useContext } from "react";
import RegisterForm from "./RegisterForm";
import RegisterHeader from "./RegisterHeader";
import LoginInfo from "../Login/LoginInfo";
import "../Login/Login.css"

// Uses the same CSS as Login except for RegisterHeader

export default function Register(props) {

    return (<>
        <div className="login-container">
            <div className="login">
                <div className="leftSide">
                    <RegisterHeader />
                    <RegisterForm />
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