class PublicHandler {
  async main(req, res) {
    res.status(200).send({
      message: 'Bienvenido a nuestra API',
      content: 'Esta es una API de prueba para la demo de "Load Testing con Locust"'
    })
  }

  async getCountries(req, res) {
    const countries = [
      { _id: '5b031b00e3e4521ee304b448', name: 'Argentina' },
      { _id: '5b031b03e3e4521ee304b449', name: 'USA' },
      { _id: '5b031b04e3e4521ee304b44a', name: 'España' },
      { _id: '5b031b06e3e4521ee304b44c', name: 'China' },
    ]
    res.status(200).send(countries)
  }

  async getCities(req, res) {
    res.status(200).send([])
  }

}

module.exports = new PublicHandler()
