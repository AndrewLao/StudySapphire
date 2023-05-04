import { useState, useEffect } from "react";
import "./CalendarView.css";
export default function CalendarView(props) {
    const [schedule, setSchedule] = useState([])
    let userData = props.userData;
    const shownDate = props.shownDate;
    console.log(props);
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
        week.push(day);
        weeksDates.push(dateStr);
        }
        setSchedule(week)
    }, [shownDate])

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
            {
                len += 1
                
            }
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
            console.log(chunkToStr(chunks))
            return (
                <div className="calendarViewDay">
                    {chunks.map((chunk, ind2) => {
                        
                        return (<CalendarChunk key={ind2} userData={userData} task={chunk[0]} size={chunk[1]} hoursPast = {chunk[2]}/>)}    
            )}
            </div>
        )})}
    </div>;
}

function CalendarChunk({userData, task, size, hoursPast})
{
    let taskData = 0
    let taskColor = "#dddddd"
    let taskName = ""
    let borderRadius = "0px"
    if (task >= 100)
    {
        taskData = userData.TASKS[task]
        taskColor = userData.RESPONSIBILITIES[taskData.RESPONSIBILITY].COLOR
        taskName = taskData.NAME
        borderRadius = "5px"
    }
    let divSize = (size * 12) + (hoursPast * 2) - 1


    

    return (
        <div className="calendarChunk" style={{
            textOverflow: "ellipsis", opacity: 1, backgroundColor: taskColor, 
            height: divSize, borderRadius: borderRadius,
            fontSize: Math.min(divSize - 2, 16)}}>
                <div>
                    {taskName}
                </div>
                {task >= 100 &&
                <span class="tooltiptext">{taskName}</span>}
            </div>
    )
}
