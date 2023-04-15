const createConversation = require("../services/create-conversation")
const createMessage = require("../services/create-message")
const getUserConversations = require("../services/get-user-conversations")

module.exports = {
  index: async function (req, res) {
    try {
      const conversations = await getUserConversations(req.user._id)
      return res.json(conversations)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  },

  save: async function (req, res) {
    const { product, seller, initialMessage } = req.body
    try {
      const conversation = await createConversation(product, seller, req.user._id, initialMessage)
      return res.status(201).json(conversation)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  },

  send: async function (req, res) {
    const { _id } = req.params
    const { content, sender, receiver } = req.body
    try {
      const message = await createMessage(_id, { sender, receiver, content })
      return res.status(201).json(message)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
} 