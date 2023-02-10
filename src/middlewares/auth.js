const jwt = require('jsonwebtoken')
const User = require('../models/User')
const secret = process.env.JWT_KEY

const withAuth = (req, res, next) => {
  const authorizationHeader = req.headers.authorization

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'unauthorized: no token provided' })
  }

  const token = authorizationHeader.replace(/Bearer /, '')

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'unauthorized: invalid token' })
    }

    User.findOne({ email: decoded.email })
      .then(user => {
        req.user = user
        next()
      })
      .catch(error => {
        res.status(401).json({ error: error.message })
      })
  })
}

module.exports = withAuth