const User = require("../models/User")

module.exports = {
  rate: async function (req, res) {
    try {
      const _id = req.body._id
      const rating = +req.body.rating
      const currentUser = req.user

      if (Number.isNaN(rating) || rating < 0 || rating > 10) {
        return res.status(400).json({ error: "rating must be a number between 0 and 10" })
      }

      const userToRate = await User.findById(_id)
      const ratingIndex = userToRate.ratings.findIndex(rating => rating.user.equals(currentUser._id))

      if (ratingIndex === -1) {
        userToRate.ratings.push({ user: req.user, rating })
        await userToRate.save()
        return res.status(201).end()
      }
      
      userToRate.ratings[ratingIndex].rating = rating
      await userToRate.save()
      return res.status(204).end()
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}