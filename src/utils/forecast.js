const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=1f14604984547e613b8a1d0db0d978aa&query=' + latitude + ',' + longitude + '&units=m'

    // request({url: url, json: true}, (error, response) => {  // body je property u response objektu
        request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather forecast', undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] +'. It is currently ' + body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + ' degress out.')
        }
    })
}

module.exports = forecast