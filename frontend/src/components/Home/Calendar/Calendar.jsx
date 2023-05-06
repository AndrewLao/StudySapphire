import "./Calendar.css";
import CalendarHeader from "./CalendarHeader";
import CalendarSelect from "./CalendarSelect";
import CalendarView from "./CalendarView";
import Days from "./Days";
import { useState, useRef, useEffect } from "react";

function getMonthName(month) {
  return [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][month];
}

function Calendar(props) {
  const date = new Date();
  const [shownDate, setShownDate] = useState(new Date());
  const [calendarSize, setCalendarSize] = useState("70%");
  const calendarRef = useRef();
  const schedulingMode = props.schedulingMode;
  const setSchedulingMode = props.setSchedulingMode;
  const selectedTask = props.selectedTask;
  const userData = props.userData;
  const setUserData = props.setUserData;
  const inMenu = props.inMenu;
  const editingAvailability = props.editingAvailability
  const getHealthiness = props.getHealthiness

  // useEffect(() => {
  //   console.log("Scheduled task is now task " + selectedTask);
  // }, [selectedTask]);

  // useEffect(() => {
  //   console.log("Scheduling Mode is " + schedulingMode);
  // }, [schedulingMode]);

  window.addEventListener("resize", () => {
    resizeAll();
  });

  useEffect(() => {
    if (calendarRef.current == undefined) setCalendarSize("70%");
    else setCalendarSize(window.innerHeight - calendarRef.current.offsetTop);
    calendarRef.current.scrollTop = 250
  }, [calendarRef]);

  function resizeAll() {
    if (calendarRef.current == undefined) setCalendarSize("70%");
    else setCalendarSize(window.innerHeight - calendarRef.current.offsetTop);
  }
  let times = [
    "12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am",
    "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm",
  ];
  return (
    <div className="fullCalendar">
      <CalendarHeader
        date={date}
        shownDate={shownDate}
        setShownDate={setShownDate}
        schedulingMode={schedulingMode}
        setSchedulingMode={setSchedulingMode}
      />
      <div className="calendarDays">
        <div></div>
        <Days shownDate={shownDate} />
      </div>
      <div
        className="calendarViewport"
        ref={calendarRef}
        style={{ height: calendarSize }}
      >

        <div className="timeSideRef">
          {times.map((time) => {
            return <div>{time}</div>;
          })}
        </div>
        {schedulingMode && (
          <CalendarSelect
            shownDate={shownDate}
            schedulingMode={schedulingMode}
            selectedTask={selectedTask}
            userData={userData}
            editingAvailability = {editingAvailability}
            getHealthiness={getHealthiness}
          />
        )}
        {!schedulingMode && (
          <CalendarView shownDate={shownDate} userData={userData} inMenu={inMenu}/>
        )}
      </div>
    </div>
  );
}

export default Calendar;
