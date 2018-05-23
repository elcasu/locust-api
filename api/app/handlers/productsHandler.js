const Product = require('../models/product')

let miStr = []

class ProductsHandler {
  async all(req, res) {
    const products = await Product.getList()
    res.send(200, products)
  }

  async getItem(req, res) {
    if(req.query.lk) {
      // xxxxxxxxxx MEMORY LEAK xxxxxxxxxx //
      miStr.push(new Array(10000000).join('*'))
      // xxxxxxxxxx xxxxxxxxxxx xxxxxxxxxx //
    }
    const product = await Product.getItem(req.params.id)
    res.send(200, product)
  }
}

module.exports = new ProductsHandler()
