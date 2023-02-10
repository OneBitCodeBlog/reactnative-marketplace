const { Factory } = require("fishery")
const { faker } = require("@faker-js/faker")
const mongoose = require("mongoose")

const productFactory = Factory.define(() => ({
  id: new mongoose.Types.ObjectId(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price(),
  category: faker.commerce.department(),
  images: [
    faker.image.imageUrl(),
    faker.image.imageUrl(),
    faker.image.imageUrl(),
    faker.image.imageUrl()
  ]
}))

module.exports = productFactory