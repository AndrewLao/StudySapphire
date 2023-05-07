import sapphireWorld from "./game-assets/sapphireworld.png";
import { useState, useEffect } from "react";
// import GameNavbar from "./GameNavBar";
import Banner from "../Banner";
import "./Game.css";


export default function Game({getUserData, postUserData}) {
    useEffect(() => {
        getUserData();
    }, []);
    
    return (
        <>
            <div className="game-wrapper-div">
                <Banner includeMenu={ true } />
                <div className="game-flex-wrapper-div">
                    <img className="main-game-background-image" src={sapphireWorld} alt="sapphireworld"></img> 
                    <div className="game-items">Game Items</div>
                </div>

            </div>
        </>
    );
}