const { Factory } = require("fishery")
const { faker } = require("@faker-js/faker")
const mongoose = require("mongoose")

const productFactory = Factory.define(() => ({
  _id: new mongoose.Types.ObjectId(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: +faker.commerce.price(),
  category: faker.helpers.arrayElement(["Eletrônicos", "Eletrodomésticos", "Moda e Acessórios", "Pets", "Brinquedos e Jogos", "Casa e Jardim", "Esporte e Lazer", "Automóveis e Veículos"]),
  images: [
    { url: faker.image.imageUrl() },
    { url: faker.image.imageUrl() },
    { url: faker.image.imageUrl() },
    { url: faker.image.imageUrl() }
  ],
  createdAt: new Date(),
  updatedAt: new Date()
}))

module.exports = productFactory