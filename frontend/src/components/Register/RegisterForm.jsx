import { useForm } from "react-hook-form";
import "./RegisterForm.css"

export default function RegisterForm() {
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
                <input className="typeIn" placeholder="Username" {...register("username")} />
                <input className="typeIn" placeholder="Password" type="password" {...register("password")} />
                <input className="typeIn" placeholder="Confirm Password" type="password" {...register("password")} />
                <input className = "submitRegister" type="submit" value="Register"/>
            </form> 
        </>
        
    );
}