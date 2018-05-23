const Country = require('../models/country')
const City = require('../models/city')

class CountriesHandler {
  async getCountries(req, res) {
    const countries = await Country.find({})
    res.status(200).send(countries)
  }

  async getCountry(req, res) {
    const country = await Country.findById(req.params.id)
    res.status(200).send(country)
  }

  async getCities(req, res) {
    const cities = await City.find({})
    res.status(200).send(cities)
  }
}

module.exports = new CountriesHandler()
