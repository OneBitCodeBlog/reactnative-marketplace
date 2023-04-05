const Product = require("../models/Product")

module.exports = {
  index: async function (req, res) {
    try {
      const products = await Product.aggregate([
        { $sort: { updatedAt: -1 } },
        { $group: { _id: "$category", products: { $push: "$$ROOT" } } },
        { $project: { products: { $slice: ['$products', 0, 8] } } }
      ])
      return res.json(products)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  },
}