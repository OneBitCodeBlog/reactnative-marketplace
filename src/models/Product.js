const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  images: [{
    filename: String,
    url: String
  }],
  seller: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Product = model('Product', productSchema)

module.exports = Product