import "./Banner.css"
import { useNavigate } from "react-router-dom";

export default function Banner(props) {
    const tokens = props.tokens;
    const navigate = useNavigate();

    function logoOnClick() {
        navigate("/");
    }

    function navigateHome() {
        navigate("/home");
    }
    
    return (
        <>
            <div className="banner">
                <div className="bannerLeftSide">
                    <img src="/icon_crystal.svg" alt="Sapphire Icon"></img>
                    <button onClick={ logoOnClick }>sapphire</button>
                </div>

                {props.includeMenu && 
                    <div className="bannerMiddle">
                        <button onClick={ navigateHome }>Return Home</button>
                    </div>
                }

                <div className="bannerRightSide">
                    <img src="/coin.svg"></img>
                    <p>{(tokens || tokens == 0) ? tokens.toFixed(0) : 90} Tokens</p>
                </div>
            </div>
        </>
    );
}