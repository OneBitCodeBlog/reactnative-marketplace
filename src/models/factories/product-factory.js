const { Factory } = require("fishery")
const { faker } = require("@faker-js/faker")
const mongoose = require("mongoose")

const productFactory = Factory.define(() => ({
  _id: new mongoose.Types.ObjectId(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price(),
  category: faker.commerce.department(),
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