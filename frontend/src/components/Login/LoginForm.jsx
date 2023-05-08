// packages
import {set, useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserPool from "../Auth/UserPool.jsx";

import {CognitoUser, CognitoUserAttribute, AuthenticationDetails} from "amazon-cognito-identity-js";

// styles
import "./LoginForm.css"
import {useContext, useEffect} from "react";
import {checkSession, login} from "../Auth/Authorization.jsx";

export default function LoginForm() {
    const { register, handleSubmit } = useForm();
    
    const navigate = useNavigate();

    useEffect(() => {
        checkSession().then( (data) => {
            console.log(data);
            navigate("/home");
        });
    }, [])

    const onSubmit = data => {
        login(data.username, data.password)
            .then( (data) => {
                console.log(data);
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