import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {CognitoUser, CognitoUserAttribute} from "amazon-cognito-identity-js";
import {useContext, useEffect} from "react";

import UserPool from '../UserPool.jsx';

import "./RegisterForm.css"
import {usernameContext} from "../../usernameContext.jsx";

export default function RegisterForm() {

    const { register, handleSubmit } = useForm();

    const { username, setUsername } = useContext(usernameContext);

    const navigate = useNavigate();

    useEffect(() => {
        console.log("Current User: " + username);
    })

    function accountExistOnClick() {
        navigate("/login");
    }

    function registerOnClick() {
        navigate("/home");
    }

    const onSubmit = data => {

        //check if passwords are the same
        if (!(data.password === data.passConfirm)){
            setMessage("Passwords are not the same.");
            return;
        }

        let attributeList = [];

        attributeList.push(
            new CognitoUserAttribute({
                Name: "email",
                Value: data.email,
            })
        )

        UserPool.signUp(data.username, data.password, attributeList, null, (err, data) => {
            // ayy this mean you fucked up
            if (err){
                console.log(err);

                switch(err.name){
                    case "InvalidPasswordException":
                        setMessage("Password does not fulfill requirements");
                        break;
                    case "InvalidParameterException":
                        setMessage("Please enter a valid email address");
                        break;
                    case "UsernameExistsException":
                        setMessage("Username already exists");
                        break;
                    default:
                        setMessage("how tf did you get here");
                        break;
                }

                return;
            }

            // ayy you logged in and arent a complete disgrace to humanity
            console.log(data);

            setUsername("It Worked!");

            navigate("/home");

        });
    };

    function setMessage(msg){
        document.getElementById("msgField").innerHTML = msg;
    }

    
    const onRegister = data => {
        console.log(data);
    }


    return (
        <>
            <form className="registerForm" onSubmit={handleSubmit(onSubmit)} >
                <label id={"msgField"}> <br/> </label>
                <input className="typeIn" placeholder="Email" {...register("email")} required />
                <input className="typeIn" placeholder="Username" {...register("username")} required />
                <input className="typeIn" placeholder="Password" type="password" {...register("password")} pattern={".{8,}"} title={"Password must be 6 or more characters"} required/>
                <input className="typeIn" placeholder="Confirm Password" type="password" {...register("passConfirm")} required />
                <input className="submitRegister" type="submit" onSubmit={onSubmit} value="Register" />
                <button className="accountExisting" onClick={accountExistOnClick}>Already Have an Account?</button>
            </form>
            
        </>
        
    );
}