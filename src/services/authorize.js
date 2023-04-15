const jwt = require('jsonwebtoken')
const User = require('../models/User')
const secret = process.env.JWT_KEY

module.exports = async function authorize(token) {
  const decoded = jwt.verify(token, secret)
  const user = await User.findById(decoded._id)
  return user ?? false
}