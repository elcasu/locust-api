const Product = require('../models/product')

let miStr = []
let counter = 0

const delay = (t) => {
  return new Promise((resolve, reject) => {
    return setTimeout(resolve, t)
  })
}

class ProductsHandler {
  async all(req, res) {
    const products = await Product.getList()
    res.send(200, products)
  }

  async getItem(req, res) {
    if(req.query.lk) {
      // xxxxxxxxxx MEMORY LEAK xxxxxxxxxx //
      miStr.push(new Array(1000).join('*'))
      // xxxxxxxxxx xxxxxxxxxxx xxxxxxxxxx //
    }
    const product = await Product.getItem(req.params.id)

    if(req.query.pf) {
      counter += 100
      console.log('COUNTER-->', counter)
      setTimeout(() => {
        res.send(200, product)
      }, counter)
      // await delay(counter)
    } else {
      res.send(200, product)
    }
  }
}

module.exports = new ProductsHandler()
