import "./CalendarHeader.css";
import { useState, useEffect } from "react";

function getMonthName(month)
{
    return (["January","February","March","April","May","June","July","August","September","October","November","December"])[month];
}

function getWeek(date, delta)
{
    let startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() + (delta * 7) - startOfWeek.getDay());
    
    return startOfWeek
    
}

function displayCalendarHeader(startOfWeek)
{
    let endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    let startMonth = getMonthName(startOfWeek.getMonth());
    let endMonth = getMonthName(endOfWeek.getMonth());
    let startDay = startOfWeek.getDate();
    let endDay = endOfWeek.getDate();
    let ret = startMonth + " " + startDay + " - "
    if (startMonth !== endMonth)
    {
        ret += endMonth + " "
    }
    ret += endDay

    return (<p>{ret}</p>);
}

export default function CalendarHeader(props) {
    let date = props.date;
    let shownDate = props.shownDate;
    let setShownDate = props.setShownDate;
    const setSchedulingMode = props.setSchedulingMode
    let schedulingMode = props.schedulingMode
    
    useEffect(() => {
        setShownDate(getWeek(date, 0))
    }, []);
    function schedulingModeText() {
        if (schedulingMode)
            return "Save Schedule"
        return "Edit Schedule"
    }
    return (
        <>
            <div className="calendarHeader">
                <img src="/calendar/leftArrow.svg" alt="Last Week" onClick={() => {setShownDate(getWeek(shownDate, - 1))}}></img>
                { displayCalendarHeader(shownDate) }
                <button onClick={() => {setSchedulingMode(!schedulingMode)}}>{schedulingModeText()}</button>
                <img src="/calendar/rightArrow.svg" alt="Last Week" onClick={() => {setShownDate(getWeek(shownDate, 1))}}></img>
            </div>
        </>
    );
}