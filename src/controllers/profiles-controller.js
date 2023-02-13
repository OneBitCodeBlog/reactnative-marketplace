module.exports = {
  update: async function (req, res) {
    try {
      const { name, email, phone } = req.body
      const user = req.user
      if (name) user.name = name
      if (email) user.email = email
      if (phone) user.phone = phone
      await user.save()
      return res.status(204).end()
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  },

  updatePassword: async function (req, res) {
    try {
      const { password, newPassword } = req.body
      const user = req.user
      if (!user.checkPassword(password)) {
        return res.status(400).json({ error: "invalid credentials" })
      }
      if (newPassword) user.password = newPassword
      await user.save()
      return res.status(204).end()
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  },

  /** @todo implement with product and file deletion */
  delete: async function (req, res) {

  }
}