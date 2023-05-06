import "./ScheduleHealth.css"

export default function ScheduleHealth({healthiness}) {
    if (!healthiness)
    {
        return (<></>)
    }
    return ( 
        <div className="scheduleHealth">
            <div className="healthScore">Health score: {healthiness.SCORE}%</div>
            {healthiness.PROBLEMS.map((problem) => {
                return (<div className="scheduleProblem">
                    <span className="pointsDeduced">{problem[1]}</span>
                    <span className="problemReason"> {problem[0]}</span>
                    </div>)
            })}
            <div className="healthExplain">The amount of tokens you earn is affected by how healthy your schedule is.
            With this score, you earn {healthiness.SCORE}% of the tokens you would earn with 100% healthiness.</div>
        </div>
    )
}