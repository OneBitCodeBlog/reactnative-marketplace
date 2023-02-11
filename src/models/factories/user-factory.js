const { Factory } = require("fishery")
const { faker } = require("@faker-js/faker")
const mongoose = require("mongoose")

const userFactory = Factory.define(() => {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()

  return {
    id: new mongoose.Types.ObjectId(),
    name: firstName + " " + lastName,
    email: faker.internet.email(firstName),
    password: faker.internet.password(6),
    phone: faker.phone.number(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

module.exports = userFactory