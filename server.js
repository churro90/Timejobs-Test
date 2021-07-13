const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const responseTime = require('./middleware/responseTime');

const app = express();

//We will use environment variables for DDBB credentials connection for safety
require('dotenv').config({ path: path.join(__dirname, '.env') });

//Middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(responseTime)

//Temperature service to handle logic
const Ts = require('./services/temperature')
const Temperature = new Ts();

mongoose.connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB sucessfully connected')).catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.get('/temperature', async (req, res) => {   
    const { city } = req.query   
    let response, retries = 0;
    try {    
    const temperatureInDB = await Temperature.checkTemperatureInDB(city)

    if(temperatureInDB){
       response = temperatureInDB;
    } else {      
        while (retries < 3){           
            response = await Temperature.getTemperature(city)
            if(response.success){
                let a = await Temperature.createTemperatureInDB(response)
                console.log(a);
                break;
            } else {
                console.log(response.error)
                retries++
            }
        }  
    }    
    retries === 3 ?     
        res.send('Hubo un error en la petición, por favor reintenta más tarde') 
        : 
        res.send(`La temperatura de ${response.city_name} es de ${response.temperature}° Celsius`)
    } catch (err) {
        console.log(err);
        if(!city) { res.send('Debes ingresar una ciudad para obtener la temperatura')}
    }     
})

app.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
})