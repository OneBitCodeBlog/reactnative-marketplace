const deleteFiles = require("../helpers/deleteFiles")
const Product = require("../models/Product")
const path = require("node:path")

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
      const pathsToDelete = req.files.map(file => file.path)
      deleteFiles(pathsToDelete)
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
      if (!product.seller._id.equals(req.user._id)) {
        return res.status(403).json({ error: "you don't have access to this resource" })
      }
      const pathsToDelete = product.images.map(img => path.resolve(process.cwd(), "public", "uploads", "products", img.filename))
      deleteFiles(pathsToDelete)
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