import "./Days.css";


export default function Days(props) {
    let date = new Date(props.shownDate)
    let dayNames = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"]
    return (
        <>
            <div className="DaysList">
                {dayNames.map((day, key) => {
                    return (<div key={ key }>
                    {generateDay(day, date)}
                    </div>)
                })}
            </div>
        </>
    )
}


function generateDay(day, date) {
    let dayOfMonth = date.getDate()
    date.setDate(date.getDate() + 1)
    return (
        <div className="DayHeader">
            {day}
            <br></br>
            {dayOfMonth}
        </div>
    )
}