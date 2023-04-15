const Conversation = require("../models/Conversation")
const User = require("../models/User")

module.exports = async function getUserConversations(userId) {
  const conversations = await Conversation.aggregate([
    { $match: { $or: [{ seller: userId }, { buyer: userId }] } },
    { $sort: { updatedAt: -1 } },
    {
      $project: {
        seller: 1,
        buyer: 1,
        messages: { $slice: ['$messages', 0, 10] },
        updatedAt: 1
      }
    },
  ])
  await User.populate(conversations, { path: "seller buyer", select: 'name email phone' })
  return conversations
}