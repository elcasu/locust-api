class PublicHandler {
  async main(req, res) {
    res.send(200, {
      message: 'Bienvenido a nuestra API',
      content: 'Esta es una API de prueba para la demo de "Load Testing con Locust"'
    })
  }
}

module.exports = new PublicHandler()
