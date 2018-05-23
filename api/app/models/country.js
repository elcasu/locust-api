const mongoose = require('mongoose')

const CountrySchema = new mongoose.Schema({
  name: { type: String, required: 'name is required' }
})

module.exports = mongoose.model('Country', CountrySchema)
