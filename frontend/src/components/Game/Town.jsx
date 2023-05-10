import { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { UserContext } from "../../App";
// import GameNavbar from "./GameNavBar";
import IDtoObject from "./IDtoObject";


export default function Town({chosen, setChosen, cost, setCost})
{  
    const canvasRef = useRef();
    const { userData, setUserData } = useContext(UserContext);
    const [mousePos, setMousePos] = useState({});
    const [relMousePos, setRelMousePos] = useState({x: 0, y: 0})
    const [lastMousePos, setLastMousePos] = useState({x: 0, y: 0})
    const [canvasWidth, setCanvasWidth] = useState(0)
    const [canvasHeight, setCanvasHeight] = useState(0)

    let [tileSize, setTileSize] = useState(0)

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
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d")

            let thisX = relMousePos.x
            let thisY = relMousePos.y
            let lastX = lastMousePos.x
            let lastY = lastMousePos.y
            if (!isNaN(lastX) && !isNaN(lastY) && lastX != -1 && lastY != -1) // rerender the last tile the mouse was on
            {
                drawImg(userData.TOWN.MAP[lastY][lastX], ctx, lastX, lastY)
            }
            if (!isNaN(thisX) && !isNaN(thisY) && thisX != -1 && thisY != -1) // render a transparent square over the new tile
            {
                ctx.globalAlpha = 0.5; // draw an overlay around
                if (getValid(thisX, thisY))
                    ctx.fillStyle = "blue";
                else
                    ctx.fillStyle = "red";
                ctx.fillRect((relMousePos.x * tileSize) + 1, (relMousePos.y * tileSize) + 1, tileSize - 2, tileSize - 2); //weird pixel offsets to avoid subpixel staining
                ctx.fillRect((relMousePos.x * tileSize) + 2, (relMousePos.y * tileSize) + 1, tileSize - 2, tileSize - 2); //weird pixel offsets to avoid subpixel staining
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
            setCanvasWidth(canvas.width)
            setCanvasHeight(canvas.height)
            const ctx = canvas.getContext("2d")
            ctx.imageSmoothingEnabled = false;

            // const image = new Image()
            // image.src = "src/components/Game/game-assets/sapphirebackground.png"
            // image.onload = function() {
            //   ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            // }

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

      function isLarge()
      {
        return [50, 60, 70, 80, 90].includes(chosen)
      }

      function getValid(x, y)
      {
        const width = userData.TOWN.MAP[0].length
        const height = userData.TOWN.MAP.length
        if (chosen == -1)
        {
            return IDtoObject(userData.TOWN.MAP[y][x], x, y).DESTROYABLE
        }
        if (isLarge())
        {
            if (x == width - 1 || y == height - 1)
            {
                console.log("ON EDGE")
                return false
            }
            for (let i = 0; i < 2; ++ i)
            {
                for (let j = 0; j < 2; ++j)
                {
                    if (!IDtoObject(userData.TOWN.MAP[y+i][x+j], x+j, y+i).BUILDABLE)
                    {
                        console.log(x + j + ", " + y + i + " not buildable")
                        return false
                    }
                        
                }
            }
            return true
        }
        else
        {
            return IDtoObject(userData.TOWN.MAP[y][x], x, y).BUILDABLE 
        }
        

      }

      function getDestroyNewTile() {
        if (Math.floor(Math.random() * 4) != 0)
            return 0
        return Math.floor(Math.random() * 6)
      }


      function handleClick()
      {
        let x = relMousePos.x
        let y = relMousePos.y
        const ctx = canvasRef.current.getContext("2d")
        if (chosen == -1)
        {
            let obj = IDtoObject(userData.TOWN.MAP[y][x], x, y)
            if (!obj.DESTROYABLE)
                return
            let userCopy = JSON.parse(JSON.stringify(userData))
            obj.RELATEDTILES.forEach((tile) => {
                let thisX = tile[0]
                let thisY = tile[1]
                let newTile = getDestroyNewTile()
                userCopy.TOWN.MAP[thisY][thisX]= newTile
                drawImg(newTile, ctx, thisX, thisY)
            })
            setUserData(userCopy)
            return
        }

        if (cost > userData.TOKENS)
            return
        if (chosen == 0)
            return
        if (!IDtoObject(chosen, 0, 0).DESTROYABLE)
        {
            console.log("this shouldn't happen!")
            return
        }
        
        if (getValid(x,y))
        {
            
            let userCopy = JSON.parse(JSON.stringify(userData))
            if (isLarge())
            {
                userCopy.TOWN.MAP[y][x] = chosen
                userCopy.TOWN.MAP[y][x+1] = chosen + 1
                userCopy.TOWN.MAP[y+1][x] = chosen + 2
                userCopy.TOWN.MAP[y+1][x+1] = chosen + 3
                drawImg(chosen, ctx, x, y)
                drawImg(chosen+1, ctx, x+1, y)
                drawImg(chosen+2, ctx, x, y+1)
                drawImg(chosen+3, ctx, x+1, y+1)
            }
            else
            {
                userCopy.TOWN.MAP[y][x] = chosen
                drawImg(chosen, ctx, x, y)
            }
            console.log(cost)
            userCopy.TOKENS -= cost;
            setChosen(0)
            setCost(0)
            setUserData(userCopy)
        }
        
      }

      return (
        <div className="canvasViewport">
            <img src="src/components/Game/game-assets/sapphirebackground.png" style={{position:"absolute", width: canvasWidth}}></img>
            <canvas ref={canvasRef} onClick={() => {handleClick()}}/>
        </div>
      )
      
}  