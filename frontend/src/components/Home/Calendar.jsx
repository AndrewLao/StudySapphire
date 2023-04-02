import "./Calendar.css";
import CalendarHeader from "./CalendarHeader";
import Days from "./Days";
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
                    <div></div>
                    <Days />
                    <div>12:00</div>
                    <div>schedule</div>
                </div>
            </div>
    );
}

export default Calendar
