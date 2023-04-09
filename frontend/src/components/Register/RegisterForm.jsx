import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import "./RegisterForm.css"

export default function RegisterForm() {
    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();

    function accountExistOnClick() {
        navigate("/login");
    }

    function registerOnClick() {
        navigate("/home");
    }

    const onSubmit = data => {
        console.log(data);
    }
    
    const onRegister = data => {
        console.log(data);
    }

    return (
        <>
            <form className="registerForm" onSubmit={handleSubmit(onSubmit)} >
                <input className="typeIn" placeholder="Email" {...register("email")} />
                <input className="typeIn" placeholder="Username" {...register("username")} />
                <input className="typeIn" placeholder="Password" type="password" {...register("password")} />
                <input className="typeIn" placeholder="Confirm Password" type="password" {...register("password")} />
                <input className="submitRegister" type="submit" value="Register" onClick={registerOnClick}/>
                <button className="accountExisting" onClick={accountExistOnClick}>Already Have an Account?</button>
            </form>
            
        </>
        
    );
}