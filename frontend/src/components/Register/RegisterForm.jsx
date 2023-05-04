import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {useContext, useEffect} from "react";

import "./RegisterForm.css"
import {checkSession, signUp} from "../Auth/Authorization.jsx";

export default function RegisterForm() {

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    useEffect(() => {
        checkSession().then( (data) => {
            console.log(data);
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

        signUp(data.username, data.password, data.email)
            .then( (data) => {
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