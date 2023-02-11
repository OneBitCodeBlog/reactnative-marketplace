const database = require("../../src/database")
const supertest = require("supertest")
const app = require("../../src/app")
const userFactory = require("../../src/models/factories/user-factory")
const productFactory = require("../../src/models/factories/product-factory")

describe("auth controller", () => {
  let connection
  let user = userFactory.build()
  let products = productFactory.buildList(5)

  beforeAll((done) => {
    connection = database.connect()
    connection.once("open", () => done())
    connection.on("error", (err) => done(err))
  })

  beforeEach(async () => {
    await connection.db.dropCollection("users")
    await connection.db.dropCollection("products")
    const userDoc = connection.models.User(user)
    await userDoc.save()
    const productDocs = products.map(p => new connection.models.Product(p))
    await connection.models.Product.bulkSave(productDocs)
  })

  afterAll(() => {
    connection.close()
  })

  test("should return recent products", async () => {
    const { statusCode, body } = await supertest(app).get("/products")

    expect(statusCode).toBe(200)
    expect(body.products.length).toBe(5)
  })
})