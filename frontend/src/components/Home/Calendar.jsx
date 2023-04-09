import "./Calendar.css";
import CalendarHeader from "./CalendarHeader";
import CalendarSelect from "./CalendarSelect"
import Days from "./Days";
import { useState, useRef } from "react";

function getMonthName(month)
{
    return (["January","February","March","April","May","June","July","August","September","October","November","December"])[month];
}

function Calendar() {
    const date = new Date()
    const [shownDate, setShownDate] = useState(new Date());
    const scrollPosRef = useRef();

    const getScrollPos = () => {
        if (scrollPosRef.current)
            return scrollPosRef.current.scrollPos
        return 0;
    }
    console.log("hello")
    return (
            <div className="fullCalendar">
            <CalendarHeader date={ date } shownDate = {shownDate} setShownDate={ setShownDate } />
                <div className="calendarViewport" ref={scrollPosRef}>
                    <div></div>
                    <Days />
                    <div>12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 12:00 </div>
                    <CalendarSelect scrollPos = {getScrollPos}/>
                </div>
            </div>
    );
    
}

export default Calendar
