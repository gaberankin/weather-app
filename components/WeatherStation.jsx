export default function WeatherStation({stationCode, gridX, gridY, city, state}) {
    return <>Station Code: {stationCode}, Grid Position: {gridX}, {gridY}, Location: {city}, {state}</>
}