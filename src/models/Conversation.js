const { Schema, model } = require('mongoose');

const conversationSchema = new Schema({
  seller: { type: Schema.Types.ObjectId, ref: 'User' },
  buyer: { type: Schema.Types.ObjectId, ref: 'User' },
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  messages: [{
    content: String,
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Conversation = model('Conversation', conversationSchema)

module.exports = Conversation