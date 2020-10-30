const request = require('postman-request');

function weatherDetails(long, lat, callback) {
    const url = `http://api.weatherstack.com/current?access_key=436e157ee35257845d2ac7289cce4aa5&query=${lat},${long}&units=f`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services !', undefined);
        }
        else if (body.error) {
            callback('Unable to find location !', undefined);
        }
        else {
            let weatherData = body.current;
            callback(undefined, {
                description: weatherData.weather_descriptions[0],
                temperature: weatherData.temperature,
                feelsLike: weatherData.feelslike,
                humidity:weatherData.humidity
            });
        }
    });

}

module.exports = weatherDetails;