import "./Calendar.css";
import CalendarHeader from "./CalendarHeader";

export default function Calendar() {
    return (
        <>
            <div className="fullCalendar">
                <CalendarHeader />
                <div className="calendarViewport">
                    <h1>Calendar Here</h1>
                </div>
            </div>
            
        </>
    );
}