import { useForm } from "react-hook-form";
import "./LoginForm.css"

export default function LoginForm() {
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        console.log(data);
    }
    
    const onRegister = data => {
        console.log(data);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} >
                <input className="typeIn" placeholder="Email" {...register("email")} />
                <input className="typeIn" placeholder="Password" type="password" {...register("password")} />
                <input className = "submitLogin" type="submit" value="Login"/>
            </form>
            <div className="buttonContainer">
                <button className="forgotPassword">Forgot Password?</button>
                <button className="register">Register New Account</button>
            </div>
            
            
        </>
        
    );
}