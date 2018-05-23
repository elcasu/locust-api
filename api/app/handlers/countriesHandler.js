const Country = require('../models/country')

class CountriesHandler {
  async getCountries(req, res) {
    const countries = await Country.find({})
    res.status(200).send(countries)
  }

  async getCountry(req, res) {
    const country = await Country.findById(req.params.id)
    res.status(200).send(country)
  }
}

module.exports = new CountriesHandler()
