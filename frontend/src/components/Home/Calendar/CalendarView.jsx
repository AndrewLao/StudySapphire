import { useState, useEffect, useRef } from "react";
import "./CalendarView.css";
import { UserContext } from "../../../App";
import { useContext } from "react";

export default function CalendarView(props) {
    const [schedule, setSchedule] = useState([])
    const {userData, setUserData} = useContext(UserContext); 
    const shownDate = props.shownDate;
    const inMenu = props.inMenu;
    useEffect(() => {
        let tempDate = new Date(shownDate);
        let scheduledTimes = userData.SCHEDULEDTIME;
        let week = [];
        let weeksDates = [];
        for (let i = 0; i < 7; ++i) {
        let day = [];
        for (let j = 0; j < 96; ++j) {
            day.push(0);
        }
        let dateStr =
            tempDate.getFullYear() + "-" + (tempDate.getMonth() + 1).toString().padStart(2, "0") +
            "-" + tempDate.getDate().toString().padStart(2, "0");
        tempDate.setDate(tempDate.getDate() + 1);
        let prescheduled = scheduledTimes[dateStr];
        if (prescheduled) {
            prescheduled.forEach((timeSlot) => { 
            for (let i = timeSlot[0]; i <= timeSlot[1]; ++i) day[i] = timeSlot[2];
            });
        }
        else {
            let availability = userData.AVAILABILITY["" + i]
            availability.forEach((chunk) => {
                for (let j = chunk[0]; j <= chunk[1]; ++j)
                    day[j] = 3;
        })
        }
        
        week.push(day);
        weeksDates.push(dateStr);
        }
        setSchedule(week)
    }, [shownDate, userData])

    function scheduleChunker(day)
    {
        if (!day)
            return [[0, 96, 23]]
        let chunks = []
        let cur = day[0]
        let hoursPast = 0
        let len = 0
        day.forEach((slot, ind) => {
            if (ind != 0 && ind % 4 == 0)
            {
                hoursPast += 1
                if (slot == 0)
                {
                    chunks.push([cur, len, hoursPast])
                    len = 1
                    hoursPast = 0
                    cur = slot
                    return
                }
            }
            if (slot == cur)
                len += 1
            else
            {
                chunks.push([cur, len, hoursPast])
                hoursPast = 0
                len = 1
                cur = slot
            }
        })
        chunks.push([cur, len, hoursPast])
        return chunks
        
    }

    function chunkToStr(chunks)
    {
        let chunkStr = ""
        chunks.forEach((chunk) => {
            chunkStr += "(" + chunk[0] + ", " + chunk[1] + ", " + chunk[2] + "), "
        })
        return chunkStr
    }
    
    return <div className="calendarView">
        {schedule.map((day, ind) => {
            let chunks = scheduleChunker(day)
            return (
                <div className="calendarViewDay">
                    {chunks.map((chunk, ind2) => {
                        
                        return (<CalendarChunk key={ind2} userData={userData} task={chunk[0]} size={chunk[1]} hoursPast = {chunk[2]} inMenu={inMenu}/>)}    
            )}
            </div>
        )})}
    </div>;
}

function CalendarChunk({userData, task, size, hoursPast, inMenu})
{
    let [hovering, setHovering] = useState(false)
    let [showPopup, setShowPopup] = useState(false)
    const timerRef = useRef();
    let taskData = 0
    let taskColor = "#dddddd"
    let taskName = ""
    let borderRadius = "0px"
    let [mouseY, setMouseY] = useState(0)


    const [mousePos, setMousePos] = useState({});

    function handleHover(event) {
        if (task >= 100)
        {
            setHovering(true)
            setMouseY(event.clientY)
        }
            
    }
    if (task >= 100)
    {
        taskData = userData.TASKS[task]
        if (taskData)
        {
            taskColor = userData.RESPONSIBILITIES[taskData.RESPONSIBILITY].COLOR
            taskName = taskData.NAME
            borderRadius = "5px"
        }
        
    }
    if (task == 3)
    {
        taskColor = "#666666"
        borderRadius = "5px"
        taskName = "Busy"
    }
    let divSize = (size * 12) + (hoursPast * 2) - 2
    useEffect(() => {
        if (hovering)
        {
            timerRef.current = setTimeout(() => {
                setShowPopup(true)
            }, 350);
        }
        else
        {
            clearTimeout(timerRef.current);
            setShowPopup(false);
        }
    }, [hovering])
    return (
        <div onMouseEnter={handleHover}
                
        onMouseLeave={() => {
                setHovering(false)
                }}>
        <div className="calendarChunk" style={{
            textOverflow: "ellipsis", opacity: 1, backgroundColor: taskColor, 
            height: divSize, borderRadius: borderRadius,
            fontSize: Math.min(divSize - 2, 16)}}>
            
                <div>
                    {taskName}
                </div>
                
            </div>
            {inMenu == "NONE" && showPopup && hovering && <span className="tooltiptext" style={{top: mouseY}}>{taskName}</span>}
            </div>
           
    )
}
