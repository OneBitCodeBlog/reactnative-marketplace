const rateUser = require("../services/rate-user")

module.exports = {
  rate: async function (req, res) {
    const rating = +req.body.rating

    if (Number.isNaN(rating) || rating < 0 || rating > 10) {
      return res.status(400).json({ error: "rating must be a number between 0 and 10" })
    }

    try {
      await rateUser(req.user._id, req.body._id, rating)
      return res.status(204).end()
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}