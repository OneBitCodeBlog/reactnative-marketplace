const Product = require("../models/Product")

module.exports = {
  index: async function (req, res) {
    try {
      const page = +req.query.page - 1 || 0
      const limit = +req.query.limit || 20
      const query = {}
      const products = await Product.find(query).sort({ updatedAt: -1 }).skip(page * limit).limit(limit)
      const total = await Product.countDocuments(query)
      return res.json({ total, page, limit, products })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  },

  save: async function (req, res) {
    try {
      const { name, price, category } = req.body
      const images = req.files.map(file => ({ filename: file.filename, url: `uploads/products/${file.filename}` }))
      const seller = req.user
      const product = new Product({ name, price, category, images, seller })
      await product.save()
      return res.status(201).json(product)
    } catch (err) {
      /** @todo handle delete file in case of error */
      return res.status(400).json({ error: err.message })
    }
  },

  /** @todo implement */
  update: async function (req, res) {

  },

  delete: async function (req, res) {
    try {
      const { _id } = req.params
      const product = await Product.findById(_id)
      /** @todo delete files */
      await product.delete()
      return res.status(204).end()
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  },

  /** @todo implement */
  search: async function (req, res) {
    
  }
}