import "./EditAvailability.css"

export default function EditAvailability(props)
{
    let task = props.task
    let setTask = props.setTask
    let editingAvailability = props.editingAvailability
    let setEditingAvailability = props.setEditingAvailability
    let allWeeksAccent = {backgroundColor: "#ffffff"};
    let thisWeekAccent = {backgroundColor: "#ffffff"}
    if (task == 3)
    {
        if (editingAvailability)
            allWeeksAccent = {backgroundColor: "#dddddd", fontWeight: "bold"}
        else
            thisWeekAccent = {backgroundColor: "#dddddd", fontWeight: "bold"}
    }
    return (
        <div className="editAvailability">
            <div className="editAvailabilityHeader">Edit Availability</div>
            <div className="editAvailabilityButtons">
                <button style={allWeeksAccent} onClick={() => {
                    setTask(3)
                    setEditingAvailability(true)
                    }}>For All Weeks</button>
                <button style={thisWeekAccent} onClick={() => {
                    setTask(3)
                    setEditingAvailability(false)
                    }}>For This Week</button>
            </div>
        </div>
    )
}