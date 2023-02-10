module.exports = {
  /** @todo test */
  add: async function (req, res) {
    try {
      const { _id } = req.body
      const favoriteAlreadyExists = req.user.favorites.find(fav => fav.product.equals(_id))
      if (favoriteAlreadyExists) {
        return res.end()
      }
      req.user.favorites.push(_id)
      await req.user.save()
      return res.status(201).end()
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  },

  /** @todo test */
  remove: async function (req, res) {
    try {
      const { product_id } = req.params
      const indexToRemove = req.user.favorites.findIndex(fav => fav.product.equals(product_id))
      if (indexToRemove === -1) {
        return res.status(404).json({ error: "favorite not found" })
      }
      req.user.favorites.splice(indexToRemove, 1)
      await req.user.save()
      return res.status(204).end()
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}