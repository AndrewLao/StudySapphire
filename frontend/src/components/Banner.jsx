import "./Banner.css"
import { useNavigate } from "react-router-dom";

export default function Banner() {
    
    const navigate = useNavigate();

    function logoOnClick() {
        navigate("/");
    }
    
    return (
        <>
            <div className="banner">
                <div className="bannerLeftSide">
                    <img src="/icon_crystal.svg" alt="Sapphire Icon"></img>
                    <button onClick={ logoOnClick }>sapphire</button>
                </div>
                <div className="bannerMiddle">
                    {/* Add Middle Items Here if needed */}
                </div>
                <div className="bannerRightSide">
                    <img src="/coin.svg"></img>
                    <p>100 Tokens</p>
                </div>
            </div>
        </>
    );
}