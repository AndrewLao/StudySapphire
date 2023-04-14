import "./CalendarTile.css"
import { useEffect, useState } from "react";


export default function CalendarTile(props) {
    let taskInfo = props.taskInfo;
    let xPos = props.xPos;
    let yPos = props.yPos;
    let mouseX = props.mouseX
    let setMouseX = props.setMouseX
    let tileType = props.tileType
    let [visibleTile, setVisibleTile] = useState(tileType)
    let [style, setStyle] = useState({})
    let [title, setTitle] = useState("")

    
    useEffect(() => {
        setVisibleTile(tileType)
        
    }, [tileType])
    useEffect(() => {
        if (taskInfo && visibleTile != "Highlighted")
        {
            setTitle(taskInfo.title)
            if (visibleTile != "Highlighted")
                setStyle({backgroundColor: taskInfo.color})
            else
                setStyle({})
        }
        else
        {
            setStyle({})
            setTitle("")
        }
            
    }, [taskInfo, visibleTile])
    
        
    return (
        <div className={"CalendarTile CalendarTile" + visibleTile} 
            style={style}

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
                if (tileType == "Set")
                    props.setIsAdding(false)
                else
                    props.setIsAdding(true)
            }}

            onMouseUp={() => {
                props.setIsScheduling(false)
                props.confirmAlter()
            }}
            >
            {title}
        </div>
    )
}