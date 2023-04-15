const Conversation = require("../models/Conversation")

module.exports = async function createConversation(
  productId,
  sellerId,
  userId,
  initialMessage = "Olá! Este produto está disponível?"
) {
  const conversation = new Conversation({
    product: productId,
    seller: sellerId,
    buyer: userId,
    messages: [{
      content: initialMessage,
      sender: userId,
      receiver: sellerId
    }]
  })
  await conversation.save()
  return conversation
}