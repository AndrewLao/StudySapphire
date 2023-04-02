import "./Days.css";


export default function Days() {
    return (
        <>
            <div className="DaysList">
                {generateDay("Sun")}
                {generateDay("Mon")}
                {generateDay("Tues")}
                {generateDay("Wed")}
                {generateDay("Thur")}
                {generateDay("Fri")}
                {generateDay("Sat")}
            </div>
        </>
    )
}


function generateDay(day) {
    return (
        <div className="DayHeader">
            {day}
        </div>
    )
}