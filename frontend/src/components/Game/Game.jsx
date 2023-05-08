import { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { UserContext } from "../../App";
// import GameNavbar from "./GameNavBar";
import IDtoObject from "./IDtoObject";
import Banner from "../Banner";
import "./Game.css";


export default function Game({getUserData, postUserData}) {

    const canvasRef = useRef();
    const { userData, setUserData } = useContext(UserContext);
    const [mousePos, setMousePos] = useState({});
    const [relMousePos, setRelMousePos] = useState({x: 0, y: 0})
    const [lastMousePos, setLastMousePos] = useState({x: 0, y: 0})

    let [tileSize, setTileSize] = useState(0)

    useEffect(() => {
        getUserData();
    }, []);

    useEffect(() => {
    const handleMouseMove = (event) => {
        setMousePos({ 
            x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
        window.removeEventListener(
        'mousemove',
        handleMouseMove
        );
    };
    }, []);

    

    useEffect(() => {
        if (canvasRef.current)
        {
            let relX = Math.floor((mousePos.x - canvasRef.current.offsetLeft) / tileSize)
            let relY = Math.floor((mousePos.y - canvasRef.current.offsetTop) / tileSize)
            if (relX > 23 || relX < 0 || relY > 15 || relY < 0)
            {
                relX = -1
                relY = -1
                setLastMousePos({x: relMousePos.x, y: relMousePos.y})
                setRelMousePos({x: relX, y: relY})
            }
            else if (relX != relMousePos.x || relY != relMousePos.y)
            {
                setLastMousePos({x: relMousePos.x, y: relMousePos.y})
                setRelMousePos({x: relX, y: relY})
            }
                
            
        }
        
    }, [mousePos])

    useEffect(() => {
        if (userData)
        {
            console.log(relMousePos)
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d")
            let thisX = relMousePos.x
            let thisY = relMousePos.y
            let lastX = lastMousePos.x
            let lastY = lastMousePos.y
            if (!isNaN(lastX) && !isNaN(lastY) && lastX != -1 && lastY != -1) // rerender the last tile the mouse was on
            {
                console.log(lastX)
                console.log(lastY)
                drawImg(userData.TOWN.MAP[lastY][lastX], ctx, lastX, lastY)
            }
            if (!isNaN(thisX) && !isNaN(thisY) && thisX != -1 && thisY != -1) // render a transparent square over the new tile
            {
                ctx.globalAlpha = 0.5; // draw an overlay around
                let tileObj = IDtoObject(userData.TOWN.MAP[thisY][thisX], thisX, thisY)
                if (tileObj.BUILDABLE)
                    ctx.fillStyle = "blue";
                else
                    ctx.fillStyle = "red";
                ctx.fillRect((relMousePos.x * tileSize) + 1, (relMousePos.y * tileSize) + 1, tileSize - 2, tileSize - 2); //weird pixel offsets to avoid subpixel staining
                ctx.globalAlpha = 1;
            }
            
            
            
            
        }
        
    }, [relMousePos])


    useEffect(() => {
        if (userData)
        {
            const canvas = canvasRef.current;
            canvas.width = window.innerWidth * 0.5
            canvas.height = canvas.width * (2/3);
            const ctx = canvas.getContext("2d")
            ctx.imageSmoothingEnabled = false;
            setTileSize(canvas.width / 24)
            const background = userData.TOWN.MAP
            background.forEach((tileRow, y) => {
                tileRow.forEach((tileID, x) => {
                    drawImg(tileID, ctx, x, y)
        })})
        }
        
      }, [userData, tileSize])


      function drawImg(id, ctx, x, y)
      {
            const image = new Image()
            const idObj = IDtoObject(id, x, y)
            image.src = "src/components/Game/game-assets/tiles/" + idObj.SPRITE + ".png"
            image.onload = function() {
              ctx.drawImage(image, x * tileSize, y * tileSize, tileSize + 2, tileSize + 2);
            }
      }
    return (
        <>
            <div className="game-wrapper-div">
                <Banner includeMenu={ true } />
                <div>
                    <canvas ref={canvasRef}></canvas>
                </div>

            </div>
        </>
    );
}