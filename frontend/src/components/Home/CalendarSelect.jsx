import "./CalendarSelect.css";
import CalendarTile from "./CalendarTile";
import { useState, useEffect, useRef } from "react";
import { useContext } from "react";
import { UserContext } from '../../App';




export default function CalendarSelect(props) {
    const [selections, setSelections] = useState([[]])
    const [dates, setDates] = useState([])
    const [startY, setStartY] = useState(0)
    const [endY, setEndY] = useState(0)
    const [isScheduling, setIsScheduling] = useState(false)
    const [mouseX, setMouseX] = useState(0)
    const [isAdding, setIsAdding] = useState(true)
    const selectedTask = props.selectedTask
    const schedulingMode = props.schedulingMode
    const { userData, setUserData } = useContext(UserContext);
    const shownDate = props.shownDate
    

    useEffect(() => {
        let tempDate = new Date(shownDate)
        let scheduledTimes = userData.SCHEDULEDTIME
        let week = []
        let weeksDates = []
        for (let i = 0; i < 7; ++i)
        {
            let day = []
            for (let j = 0; j < 96; ++j)
            {
                day.push(0)
            }
            let dateStr = tempDate.getFullYear() + "-" + 
                (tempDate.getMonth() + 1).toString().padStart(2, "0") + "-" + 
                tempDate.getDate().toString().padStart(2, "0")
            tempDate.setDate(tempDate.getDate() + 1)
            let prescheduled = scheduledTimes[dateStr]
            if (prescheduled)
            {
                prescheduled.forEach((timeSlot) => {
                    for (let i = timeSlot[0]; i <= timeSlot[1]; ++i)
                        day[i] = timeSlot[2]
                })
            }
            week.push(day)
            weeksDates.push(dateStr)
        }
        setSelections(week)
        setDates(weeksDates)
    }, [shownDate]);

    useEffect(() => {
        alterSelections(mouseX, startY, endY, false, isAdding, selections, setSelections, selectedTask)
    }, [startY, endY])

    const confirmAlter = () => {
        alterSelections(mouseX, startY, endY, true, isAdding, selections, 
            setSelections, selectedTask, dates, userData, setUserData)
    }
    let rows = []
    for (let i = 0; i < 7; ++i)
    {
        rows.push(i)
    }
    if (selections.length != 7 || rows.length != 7) // Takes a couple milliseconds to generate selections, so this returns a blank div until it's set up
    {
        return ( <div></div>)
    } 
    return (
        <div className = "CalendarSelect">
            {
            rows.map((i) => {
                return <CalendarRow day = {selections[i]} key = {i} xPos = {i}
                setStartY = {setStartY} setEndY = {setEndY} 
                isScheduling = {isScheduling} setIsScheduling = {setIsScheduling} 
                mouseX = {mouseX} setMouseX = {setMouseX} isAdding = {isAdding} setIsAdding = {setIsAdding}
                confirmAlter = {confirmAlter} userData = {userData} />
            })
            }
        </div>
        
    )
}

function writeDay(date, userData, timeSlots, setUserData)
{
    console.log(date)
    console.log(timeSlots)
    let cur = 0
    let intervals = []
    let start = -1
    let end = -1
    timeSlots.forEach((task, i) => {
        if (task == cur)
            return
        if (cur != 0 && start != -1)
        {
            end = i - 1
            intervals.push([start, end, cur])
        }
        start = i
        cur = task
    })
    if (cur != 0)
        intervals.push([start, 95, cur])
    let userCopy = JSON.parse(JSON.stringify(userData))
    userCopy.SCHEDULEDTIME[date] = intervals
    setUserData(userCopy)

}

function alterSelections(newDay, start, end, confirm, isAdding, selections, setSelections, 
    selectedTask, dates, userData, setUserData)
{
    if (selections.length != 7)
        return
    let newSelections = []
    selections.forEach((day) => {
        let newDay = []
        day.forEach((timeSlot) => {
            if (timeSlot == 1)
                newDay.push(0)
            else
                newDay.push(timeSlot)
        })
        newSelections.push(newDay)
    })
    let newVal = 1
    if (confirm)
        if (isAdding)
            newVal = selectedTask
        else
            newVal = 0
    for (let i = Math.min(start, end); i <= Math.max(start, end); ++i)
    {
        if (newSelections[newDay][i] == 0 || newSelections[newDay][i] == selectedTask)
        newSelections[newDay][i] = newVal
    }
    setSelections(newSelections)
    if (confirm)
    {
        writeDay(dates[newDay], userData, newSelections[newDay], setUserData)
    }
}

function CalendarRow(props) {
    let userData = props.userData
    let day = props.day
    return (
        <div className = "CalendarRow">
            {
            day.map((d, index) => {
                let gapClass = ""
                if (index % 4 == 0 && index != 0)
                {
                    gapClass = "CalendarGap"
                }
                let taskInfo = null
                let selection;
                if (d >= 100)
                {
                    selection = "Set"
                    taskInfo = {
                        title: userData.TASKS[d].NAME,
                        color: userData.RESPONSIBILITIES[userData.TASKS[d].RESPONSIBILITY].COLOR
                    }
                }
                else if (d == 1 && props.isAdding)
                    selection = "Selected"
                else
                    selection = "Unselected"
                return (
                    <>
                    <div className={gapClass}></div>
                    <CalendarTile key = {index} title={"placeholder"} 
                    tileType= {selection} yPos = {index}
                    xPos = {props.xPos}
                    isScheduling = {props.isScheduling}
                    setIsScheduling = {props.setIsScheduling} 
                    setStartY = {props.setStartY} setEndY = {props.setEndY}
                    mouseX = {props.mouseX} setMouseX = {props.setMouseX}
                    setIsAdding = {props.setIsAdding}
                    confirmAlter = {props.confirmAlter}
                    taskInfo = {taskInfo}/>
                    </>
                    )
                })
            }
        </div>
        
    )
}