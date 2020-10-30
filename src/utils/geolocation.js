const request = require('postman-request');
const geolocation = function (address, callback) {
    const placeurl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoidm9pZHBwMjUiLCJhIjoiY2tncXU1bHk2MXFxejJxcnh3bnJkNDFhayJ9.tZ6ya2uyM2lAutLWbe-sXQ`;
    request({ url: placeurl, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to geolocation services !', undefined);
        }
        else if (body.features.length === 0) {
            callback('Unable to get location !', undefined);
        }
        else {
            callback(undefined, {
                place_name: body.features[0].place_name,
                long: body.features[0].center[0],
                lat: body.features[0].center[1]
            });
        }
    });
}

module.exports = geolocation;