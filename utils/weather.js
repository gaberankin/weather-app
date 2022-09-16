export async function getWeatherStation(latitude, longitude) {
    const res = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`, {mode: 'cors'});
    const jsonData = await res.json();

    return {
        stationCode: jsonData.properties.cwa,
        gridX: jsonData.properties.gridX,
        gridY: jsonData.properties.gridY,
        location: {
            city: jsonData.properties.relativeLocation.properties.city,
            state: jsonData.properties.relativeLocation.properties.state,
        },
    };        
}

export async function getForecast(stationCode, gridX, gridY) {
    const res = await fetch(`https://api.weather.gov/gridpoints/${stationCode}/${gridX},${gridY}/forecast`, {mode:'cors'});
    const jsonData = await res.json();

    return jsonData.properties;
}

export function convertTempurature(temp, tempUnits, convertToUnits) {
    if (tempUnits == convertToUnits) {
        return temp;
    }
    if (tempUnits == 'F') {
        // convert to C
        return Math.round((temp - 32) * (5/9))
    }
    // convert to F
    return Math.round((temp * (9/5)) + 32)
}