import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { SapphireUserDataJSON } from "../SapphireUserData";

import "./RegisterForm.css"
import {checkSession, signUp} from "../Auth/Authorization.jsx";
import { UserContext } from "../../App";

export default function RegisterForm(props) {

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    const { userData, setUserData } = useContext(UserContext);

    useEffect(() => {
        checkSession().then( (data) => {
            navigate("/home");
        });
    }, [])

    function accountExistOnClick() {
        navigate("/login");
    }


    const onSubmit = data => {

        //check if passwords are the same
        if (!(data.password === data.passConfirm)){
            setMessage("Passwords are not the same.");
            return;
        }
        const inputUsername = data.username;
        const inputEmail = data.email; 
        signUp(data.username, data.password, data.email)
            .then((data) => {
                let temp = userData;
                temp.userID = data.userSub;
                temp.USERNAME = inputUsername;
                temp.EMAIL = inputEmail;
                setUserData(temp);
                props.postUserData();
                navigate("/login");
            })
            .catch( (err) => {
                console.log(err);
                setMessage(err);
            } );
    }

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