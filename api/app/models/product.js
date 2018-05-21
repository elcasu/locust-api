const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  stock: { type: Number }
})

class ProductClass {
  static async getList() {
    return this.find({})
  }

  static async getItem(id) {
    return this.findById(id)
  }
}

ProductSchema.loadClass(ProductClass)
module.exports = mongoose.model('Product', ProductSchema)
