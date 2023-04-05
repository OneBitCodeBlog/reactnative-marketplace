require("dotenv").config()
const addressFactory = require("../factories/address-factory");
const productFactory = require("../factories/product-factory");
const userFactory = require("../factories/user-factory");
const { connect } = require("../../database");
const User = require("../User");
const Product = require("../Product");

const usersQnty = +process.argv.find(arg => arg.match(/^--users=/))?.replace(/^--users=/, "") || 10
const productsQnty = +process.argv.find(arg => arg.match(/^--products=/))?.replace(/^--products=/, "") || 400

const connection = connect()

connection.on("open", async () => {
  const users = userFactory.buildList(usersQnty, { addresses: addressFactory.buildList(4) })
  const products = users.map(user => productFactory.buildList(productsQnty / usersQnty, { seller: user })).flat()
  const userDocs = users.map(u => new User(u))
  const productDocs = products.map(p => new Product(p))
  await User.bulkSave(userDocs)
  await Product.bulkSave(productDocs)
  console.log(`Created ${users.length} users and ${products.length} products.`)
  connection.close()
})
