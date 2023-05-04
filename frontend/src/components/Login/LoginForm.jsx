// packages
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserPool from "../UserPool.jsx";

import {CognitoUser, CognitoUserAttribute, AuthenticationDetails} from "amazon-cognito-identity-js";

// styles
import "./LoginForm.css"
import {useContext, useEffect} from "react";
import {usernameContext} from "../../usernameContext.jsx";

export default function LoginForm() {
    const { register, handleSubmit } = useForm();
    
    const navigate = useNavigate();

    const { username, setUsername } = useContext(usernameContext);

    useEffect(() => {
        console.log("Current User: ", username);
        if ( !(username === "") ){
            navigate("/home");
        }
    })

    const onSubmit = data => {
        console.log(data);

        const user = new CognitoUser({
            Username: data.username,
            Pool: UserPool,
        });

        const authDetails = new AuthenticationDetails({
            Username: data.username,
            Password: data.password,
        });

        const userName = data.username;

        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                console.log("Successfully Logged in");
                setUsername(userName);
                navigate("/home");
            },
            onFailure: (err) => {
                if ( err.name === "UserNotConfirmedException"){
                    setUsername(userName);
                    navigate("/home");
                }
                console.log("Error: ", err);
                setMessage(err.message);
            }
        });
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