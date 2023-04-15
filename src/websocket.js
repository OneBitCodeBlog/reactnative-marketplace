const authorize = require("./services/authorize")
const createMessage = require("./services/create-message")

async function setup(socket) {
  try {
    const user = await authorize(socket.handshake.auth.token)
    if (!user) socket.disconnect()
    
    socket.on('message_sent', async data => {
      if (data?.conversationId) {
        const newMessage = await createMessage(data.conversationId, data.message)
        socket.broadcast.to(data.conversationId).emit("new_message", newMessage)
        socket.emit('new_message', { conversationId: data.conversationId, message: newMessage })
      }
    })
  } catch (err) {
    socket.disconnect()
  }
}

module.exports = { setup }