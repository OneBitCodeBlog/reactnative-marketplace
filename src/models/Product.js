const { Schema, model, default: mongoose } = require("mongoose");

const productSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: ["Eletrônicos", "Eletrodomésticos", "Moda e Acessórios", "Pets", "Brinquedos e Jogos", "Casa e Jardim", "Esporte e Lazer", "Automóveis e Veículos"],
    required: true
  },
  published: {
    type: Boolean,
    default: true
  },
  address: {
    _id: mongoose.Schema.Types.ObjectId,
    street: String,
    number: String,
    complement: String,
    district: String,
    city: String,
    state: String,
    cep: String
  },
  images: [{
    _id: mongoose.Schema.Types.ObjectId,
    filename: String,
    url: String
  }],
  seller: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Product = model('Product', productSchema)

module.exports = Product