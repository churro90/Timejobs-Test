const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TemperatureSchema = new Schema({
    city: {type: String, required: true},
    city_name: {type: String, required: true},
    temperature: {type: Number, required: true}
})

module.exports = Temperature = mongoose.model('temperatures', TemperatureSchema);