import ForecastPeriod from "./ForecastPeriod"

export default function ForecastPane({data, displayUnit}) {
    console.log(data);
    return (<div className="forecast-pane">
        {data.periods.map(period => {
            return <ForecastPeriod key={period.number} displayUnit={displayUnit} {...period} />
        })}
    </div>)
}