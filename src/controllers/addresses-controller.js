const { default: mongoose } = require("mongoose")

module.exports = {
  index: async function (req, res) {
    try {
      const addresses = req.user.addresses
      return res.json(addresses)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  },

  save: async function (req, res) {
    try {
      const { street, number, complement, district, city, state, cep } = req.body
      const address = {
        _id: new mongoose.Types.ObjectId(),
        street,
        number,
        complement,
        district,
        city,
        state,
        cep
      }
      req.user.addresses.push(address)
      await req.user.save()
      return res.status(201).json(address)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  },

  delete: async function (req, res) {
    try {
      const { _id } = req.params
      const indexToRemove = req.user.addresses.findIndex(addr => addr._id.equals(_id))

      if (indexToRemove === -1) {
        return res.status(404).json({ error: "address not found" })
      }

      req.user.addresses.splice(indexToRemove, 1)
      await req.user.save()
      return res.status(204).end()
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}