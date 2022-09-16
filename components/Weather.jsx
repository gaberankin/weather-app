import { useState } from "react";
import { getCoords } from "../utils/geolocation";
import { getForecast, getWeatherStation } from "../utils/weather";

import Location from "./Location";
import WeatherStation from "./WeatherStation";
import ForecastPane from "./ForecastPane";

export default function Weather({onLocation = () => {}, onError = () => {}, displayUnit = 'F'}) {
    const [locationCallResponse, updateLocationCallResponse] = useState(null);
    const [weatherStationResponse, updateWeatherStationResponse] = useState(null);
    const [forecastResponse, updateforecastResponse] = useState(null);
    if (locationCallResponse === null) {
        getCoords().then((data) => {
            updateLocationCallResponse({success: data, error: null});
        }, (err) => {
            onError(err);
            updateLocationCallResponse({success: null, error: err});
        });

        return <>Please wait!</>;
    }

    if (locationCallResponse.error !== null) {
        return <>Error retrieving position data: {locationCallResponse.error.message}</>;
    }

    if (weatherStationResponse === null) {
        getWeatherStation(locationCallResponse.success.latitude, locationCallResponse.success.longitude).then(data => {
            onLocation(data.location);
            updateWeatherStationResponse({success: data, error: null});
        }, err => {
            onError(err);
            updateWeatherStationResponse({success: null, error: err});
        });
        return <>Please wait!  Loading weather station information!</>;
    }

    if (weatherStationResponse.error !== null) {
        return <>Error retrieving weather station data: {weatherStationResponse.error.message}</>;
    }

    if (forecastResponse === null) {
        getForecast(weatherStationResponse.success.stationCode, weatherStationResponse.success.gridX, weatherStationResponse.success.gridY).then(data => {
            updateforecastResponse({success: data, error: null});
        }, err => {
            onError(err);
            updateforecastResponse({success: null, error: err});
        })
        return <>Please wait!  Loading weather information!</>;
    }

    if (forecastResponse.error !== null) {
        return <>Error retrieving weather data: {forecastResponse.error.message}</>;
    }
    
    return (<div>
        <Location latitude={locationCallResponse.success.latitude} longitude={locationCallResponse.success.longitude} />
        <WeatherStation stationCode={weatherStationResponse.success.stationCode} gridX={weatherStationResponse.success.gridX} gridY={weatherStationResponse.success.gridY} city={weatherStationResponse.success.location.city} state={weatherStationResponse.success.location.state} />
        <ForecastPane data={forecastResponse.success} displayUnit={displayUnit} />
        <p>Weather: {JSON.stringify(forecastResponse)}</p>
    </div>);
}