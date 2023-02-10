const { Factory } = require("fishery")
const { faker } = require("@faker-js/faker")

const userFactory = Factory.define(() => ({
  street: faker.address.streetAddress(),
  number: faker.address.buildingNumber(),
  complement: faker.address.secondaryAddress(),
  district: faker.address.county(),
  city: faker.address.city(),
  state: faker.address.state(),
  cep: faker.address.zipCode()
}))

module.exports = userFactory