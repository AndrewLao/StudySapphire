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
                {/* paragraph tags temporary until navigation links are sorted in design */}
                <div className="bannerMiddle">
                    <p>adfd</p>
                    <p>adfd</p>
                    <p>adfd</p>
                    <p>adfd</p>
                    
                </div>
                <div className="bannerRightSide">
                    <img src="/coin.svg"></img>
                    <p>100 Coins</p>
                </div>
            </div>
        </>
    );
}