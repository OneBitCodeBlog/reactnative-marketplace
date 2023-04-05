const User = require('../models/User')
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_KEY

module.exports = {
  register: async function (req, res) {
    try {
      const { name, email, password, phone } = req.body
      const user = new User({ name, email, password, phone })
      await user.save()

      const token = jwt.sign({ _id: user._id, email: user.email }, jwtSecret, { expiresIn: "7d" })
      return res.status(201).json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          addresses: user.addresses,
          averageRating: user.getAverageRating(),
          favorites: user.favorites,
          createdAt: user.createdAt
        },
        token
      })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  },

  login: async function (req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(401).json({ error: "invalid credentials" })
      }

      const isSame = user.checkPassword(password)

      if (!isSame) {
        return res.status(400).json({ error: "invalid credentials" })
      }

      const token = jwt.sign({ _id: user._id, email: user.email }, jwtSecret, { expiresIn: "7d" })

      return res.json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          addresses: user.addresses,
          averageRating: user.getAverageRating(),
          favorites: user.favorites,
          createdAt: user.createdAt
        },
        token
      })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  },
}