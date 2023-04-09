import "./CalendarTile.css"
import { useEffect, useState } from "react";


export default function CalendarTile(props) {
    let title = props.title;
    let xPos = props.xPos;
    let yPos = props.yPos;
    let mouseX = props.mouseX
    let setMouseX = props.setMouseX
    let tileType = props.tileType
    let [visibleTile, setVisibleTile] = useState(tileType)

    
    useEffect(() => {
        setVisibleTile(tileType)
        
    }, [tileType])
    return (
        <div className={"CalendarTile CalendarTile" + visibleTile} 

            onMouseEnter={() => {
                if (!props.isScheduling)
                {
                    setVisibleTile("Highlighted")
                }
                else if (mouseX == xPos)
                {
                    props.setEndY(yPos)
                }
            }} 
            onMouseLeave={() => setVisibleTile(tileType)}

            onMouseDown={() => {
                setVisibleTile(tileType)
                props.setIsScheduling(true)
                props.setStartY(yPos)
                props.setMouseX(xPos)
                props.setEndY(yPos)
                if (tileType == "Selected")
                    props.setIsAdding(false)
                else
                    props.setIsAdding(true)
            }}

            onMouseUp={() => {
                props.setIsScheduling(false)
                props.confirmAlter()
            }}
            >
            {title + " " + yPos}
        </div>
    )
}