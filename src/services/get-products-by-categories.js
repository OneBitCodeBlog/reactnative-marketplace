const Product = require("../models/Product")

module.exports = async function getProductsByCategories() {
  const products = await Product.aggregate([
    { $match: { published: true }},
    { $sort: { updatedAt: -1 } },
    { $group: { _id: "$category", products: { $push: "$$ROOT" } } },
    { $project: { products: { $slice: ['$products', 0, 8] } } }
  ])
  return products
}