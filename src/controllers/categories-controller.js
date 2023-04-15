const getProductsByCategories = require("../services/get-products-by-categories")

module.exports = {
  index: async function (req, res) {
    try {
      const products = await getProductsByCategories()
      return res.json(products)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  },
}