// packages
import {useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";

// styles
import "./LoginForm.css"
import {useEffect, useContext} from "react";
import {checkSession, login} from "../Auth/Authorization.jsx";
import { UserContext } from "../../App";

export default function LoginForm(props) {
    const { register, handleSubmit } = useForm();
    const { userData, setUserData } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        checkSession().then( (data) => {
            console.log(data);
            navigate("/home");
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    const onSubmit = data => {
        let inputUsername = data.username;
        login(data.username, data.password)
            .then((data) => {
                let temp = userData;
                temp.userID = data.idToken.payload.sub;
                temp.USERNAME = inputUsername;
                temp.EMAIL = data.idToken.payload.email;
                setUserData(temp);
                props.getUserData();
                navigate("/home");
            })
            .catch((err) => {
                console.log(err);
                setMessage(err.message);
            })
    }
    
    const onRegister = data => {
        console.log(data);
    }

    function registerOnClick() {
        navigate("/register");
    }

    function setMessage(msg){
        document.getElementById("msgField").innerHTML = msg;
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} >
                <label id={"msgField"}> <br/> </label>
                <input className="typeIn" id={"user"} placeholder="Username" {...register("username")} />
                <input className="typeIn" placeholder="Password" type="password" {...register("password")} />
                <input className = "submitLogin" type="submit" value="Login" onSubmit={ onSubmit }/>
            </form>
            <div className="buttonContainer">
                <button className="forgotPassword">Forgot Password?</button>
                <button onClick={ registerOnClick } className="registerButton">Register New Account</button>
            </div>
            
            
        </>
        
    );
}