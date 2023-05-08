const mongoose = require("mongoose")
const Conversation = require("../models/Conversation")

module.exports = async function createMessage(conversationId, { sender, receiver, content }) {
  const conversation = await Conversation.findById(conversationId)
  const now = new Date()
  const newMessage = {
    _id: new mongoose.Types.ObjectId(),
    content,
    sender,
    receiver,
    createdAt: now
  }
  conversation.messages.unshift(newMessage)
  conversation.updatedAt = now
  await conversation.save()
  return newMessage
}