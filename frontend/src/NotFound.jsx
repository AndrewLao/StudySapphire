import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
    return (
        <div className="notFoundDiv">
            <h1>Oops! You seem to be lost.</h1>
            <p>Return to Login</p>
            <Link to='/'>Login</Link>
        </div>
    )
}