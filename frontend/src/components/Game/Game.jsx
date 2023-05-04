import sapphireWorld from "./game-assets/sapphireworld.png";
// import GameNavbar from "./GameNavBar";
import Banner from "../Banner";

import "./Game.css";

export default function Game() {
    return (
        <>
            <div className="game-wrapper-div">
                <Banner />
                <div className="game-flex-wrapper-div">
                    <img className="main-game-background-image" src={sapphireWorld} alt="sapphireworld"></img> 
                    <div className="game-items">Game Items</div>
                </div>

            </div>
        </>
    );
}