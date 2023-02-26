import { useContext } from "react";
import LoginForm from "./LoginForm";
import LoginHeader from "./LoginHeader";
import LoginInfo from "./LoginInfo";
import "./Login.css"
const banner = null;
export default function Login(props) {
    let bannerHeight = props.bannerHeight;

    return (<>
        <div className="noscroll">
            <div className="login">
                <div className="leftSide">
                    <LoginHeader />
                    <LoginForm />
                </div>
                <div className="rightSide">
                    <LoginInfo bannerHeight={bannerHeight}/>
                </div>
            </div>
        </div>
    </>)
}