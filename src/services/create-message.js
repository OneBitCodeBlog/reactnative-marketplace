const mongoose = require("mongoose")
const Conversation = require("../models/Conversation")

module.exports = async function createMessage(conversationId, { sender, receiver, content }) {
  const conversation = await Conversation.findById(conversationId)
  const newMessage = {
    _id: new mongoose.Types.ObjectId(),
    content,
    sender,
    receiver,
    createdAt: new Date()
  }
  conversation.messages.unshift(newMessage)
  await conversation.save()
  return newMessage
}