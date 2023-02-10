const Product = require("../models/Product")
const User = require("../models/User")

module.exports = {
  /** @todo test */
  show: async function (req, res) {
    try {
      const { _id } = req.params
      const user = await User.findById(_id).populate(["favorites.product", "ratings.user"])
      const averageRating = user.ratings.reduce((total, current) => total + current.rating, 0) / user.ratings.length
      const products = await Product.find({ seller: user })
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        averageRating,
        products
      })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  },

  /** @todo implement */
  update: async function (req, res) {

  },

  /** @todo implement */
  updatePassword: async function (req, res) {

  },

  /** @todo implement */
  delete: async function (req, res) {

  }
}