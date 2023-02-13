const { Factory } = require("fishery")
const { faker } = require("@faker-js/faker")
const mongoose = require("mongoose")

const addressFactory = Factory.define(() => ({
  _id: new mongoose.Types.ObjectId(),
  street: faker.address.streetAddress(),
  number: faker.address.buildingNumber(),
  complement: faker.address.secondaryAddress(),
  district: faker.address.county(),
  city: faker.address.city(),
  state: faker.address.state(),
  cep: faker.address.zipCode()
}))

module.exports = addressFactory