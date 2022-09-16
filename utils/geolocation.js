export function getCoords() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((positionData) => {
            resolve(positionData.coords);
        }, (errorData) => {
            reject(errorData);
        })
    })
}