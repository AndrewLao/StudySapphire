// packages
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// styles
import "./LoginForm.css"

export default function LoginForm() {
    const { register, handleSubmit } = useForm();
    
    const navigate = useNavigate();

    const onSubmit = data => {
        console.log(data);
    }
    
    const onRegister = data => {
        console.log(data);
    }

    function registerOnClick() {
        navigate("/register");
    }

    const loginOnClick = () => {
        navigate("/home");
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} >
                <input className="typeIn" placeholder="Email" {...register("email")} />
                <input className="typeIn" placeholder="Password" type="password" {...register("password")} />
                <input className = "submitLogin" type="submit" value="Login" onClick={ loginOnClick }/>
            </form>
            <div className="buttonContainer">
                <button className="forgotPassword">Forgot Password?</button>
                <button onClick={ registerOnClick } className="registerButton">Register New Account</button>
            </div>
            
            
        </>
        
    );
}