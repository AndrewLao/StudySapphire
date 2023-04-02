import { useContext } from "react";
import RegisterForm from "./RegisterForm";
import RegisterHeader from "./RegisterHeader";
import "./Register.css";

export default function Register(props) {

    return (<>
        <div className="register-container">
            <div className="registerScreen">
                <div className="registerSpacer"></div>
                <div className="registerLeftSide">
                    <RegisterHeader />
                    <RegisterForm />
                </div>
                <div className="registerRightSide">
                    <img src="/Icon_crystal_register.svg"></img>
                </div>
            </div>
            <div className="footer-wave">
                <img className="wave" src="/wave.svg"></img>
            </div>
        </div>
    </>)
}