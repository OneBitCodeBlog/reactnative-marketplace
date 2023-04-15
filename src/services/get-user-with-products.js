const Product = require("../models/Product")
const User = require("../models/User")

module.exports = async function getUserWithProducts(userId) {
  const user = await User.findById(userId).populate(["favorites.product", "ratings.user"])
  const products = await Product.find({ seller: user })
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    averageRating: user.getAverageRating(),
    products
  }
}