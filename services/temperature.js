const axios = require('axios')
const Temperature = require('../models/Temperature');

class TemperatureService {
    constructor(){
        this.url = 'http://api.openweathermap.org/data/2.5/weather?'
    }

    getTemperature = async(city) => {
        let errorProbability = Math.floor(Math.random()*99 + 1)
        if(errorProbability > 15){
            let response = await axios.get(`${this.url}q=${city}&APPID=${process.env.openWeatherAPIKey}`)
            return {
                success:true,
                city: response.data.id,
                city_name: response.data.name.toLowerCase(),
                temperature: (this.kelvinToCelsius(response.data.main.temp)).toFixed(1)
            }
        } else {
            return {
                success: false,
                error: 'Hubo un error, reintentando petición'
            }
        }
   
    }
    kelvinToCelsius = (temperature) => {
        return temperature - 273.15
    }

    checkTemperatureInDB = async(city) => {
        return await Temperature.findOne({city_name: city.toLowerCase()})     
    }

    createTemperatureInDB = async(payload) => {
        return await Temperature.create(payload);
    }
}

module.exports = TemperatureService;