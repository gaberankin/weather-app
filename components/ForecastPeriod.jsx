import { convertTempurature } from "../utils/weather";

export default function ForecastPeriod({name, startTime, endTime, isDaytime, temperature, temperatureUnit, temperatureTrend, windSpeed, windDirection, icon, shortForecast, detailedForecast, displayUnit}) {
    let img = null;
    if (icon) {
        img = <img className="forecast-icon" src={icon} />
    }
    return (<div className="forecast-period">
        {img}
        <div className="forecast-content">
            <p>{name} - {startTime} - {endTime}</p>
            <p>{convertTempurature(temperature, temperatureUnit, displayUnit)}&deg; {displayUnit}</p>
        </div>
    </div>);
}