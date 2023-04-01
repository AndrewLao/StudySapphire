import "./Calendar.css";
import CalendarHeader from "./CalendarHeader";

import { useState } from "react";

function getMonthName(month)
{
    return (["January","February","March","April","May","June","July","August","September","October","November","December"])[month];
}

function Calendar() {
    const date = new Date()
    const [shownDate, setShownDate] = useState(new Date());

    return (
            <div className="fullCalendar">
            <CalendarHeader date={ date } shownDate = {shownDate} setShownDate={ setShownDate } />
                <div className="calendarViewport">
                    <p>Today is {shownDate.toString()} </p>
                </div>
            </div>
    );
}

export default Calendar
