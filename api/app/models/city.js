const mongoose = require('mongoose')

const CitySchema = new mongoose.Schema({
  name: { type: String, required: 'name is required' }
})

module.exports = mongoose.model('City', CitySchema)
