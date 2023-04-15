const authorize = require('../services/authorize')

const withAuth = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization
  if (!authorizationHeader) {
    return res.status(401).json({ message: 'unauthorized: no token provided' })
  }

  const token = authorizationHeader.replace(/Bearer /, '')

  try {
    const user = await authorize(token)
    if (!user) throw new Error('unauthorized')
    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({ error: 'unauthorized: invalid token' })
  }
}

module.exports = withAuth