const database = require("../../src/database")
const supertest = require("supertest")
const app = require("../../src/app")
const userFactory = require("../../src/models/factories/user-factory")
const productFactory = require("../../src/models/factories/product-factory")
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_KEY

describe("auth controller", () => {
  let connection
  let token
  let user = userFactory.build()
  let seller = userFactory.build()
  let favoriteProducts = productFactory.buildList(2, { seller: seller._id })
  let products = productFactory.buildList(3, { seller: seller._id })

  beforeAll((done) => {
    connection = database.connect()
    connection.once("open", () => done())
    connection.on("error", (err) => done(err))
  })

  beforeEach(async () => {
    await connection.db.dropCollection("users")
    await connection.db.dropCollection("products")
    const sellerDoc = new connection.models.User(seller)
    await sellerDoc.save()
    const productDocs = favoriteProducts.concat(products).map(p => new connection.models.Product(p))
    await connection.models.Product.bulkSave(productDocs)
    const userDoc = new connection.models.User(user)
    userDoc.favorites.push(...favoriteProducts)
    await userDoc.save()
    if (!token) {
      token = jwt.sign({ _id: user._id, email: user.email }, jwtSecret, { expiresIn: "1d" })
    }
  })

  afterAll(() => {
    connection.close()
  })

  test("should return all favorite products from authenticated user", async () => {
    const { statusCode, body } = await supertest(app).get("/favorites").set("Authorization", `Bearer ${token}`)

    expect(statusCode).toBe(200)
    expect(body.favorites.length).toBe(2)
    expect(body.favorites[0]._id).toBe(favoriteProducts[0]._id.toString())
    expect(body.favorites[0].name).toBe(favoriteProducts[0].name)
    expect(body.favorites[1]._id).toBe(favoriteProducts[1]._id.toString())
    expect(body.favorites[1].name).toBe(favoriteProducts[1].name)
  })

  test("should not return favorites if no authorization header is provided", async () => {
    const { statusCode } = await supertest(app).get("/favorites")

    expect(statusCode).toBe(401)
  })

  test("should save a new favorite for the authenticated user", async () => {
    const newFavorite = products[0]

    const { statusCode } = await supertest(app).post("/favorites").send({ _id: newFavorite._id }).set("Authorization", `Bearer ${token}`)
    const updatedUser = await connection.models.User.findById(user._id, "favorites")

    expect(statusCode).toBe(201)
    expect(updatedUser.favorites.length).toBe(3)
    expect(updatedUser.favorites).toContainEqual(newFavorite._id)
  })

  test("should not add favorite if no authorization header is provided", async () => {
    const { statusCode } = await supertest(app).post("/favorites")

    expect(statusCode).toBe(401)
  })

  test("should remove a favorite for the authenticated user", async () => {
    const favoriteToRemove = favoriteProducts[0]

    const { statusCode } = await supertest(app).delete(`/favorites/${favoriteToRemove._id}`).set("Authorization", `Bearer ${token}`)
    const updatedUser = await connection.models.User.findById(user._id, "favorites")

    expect(statusCode).toBe(204)
    expect(updatedUser.favorites.length).toBe(1)
    expect(updatedUser.favorites).not.toContainEqual(favoriteToRemove._id)
  })

  test("should not delete favorite if no authorization header is provided", async () => {
    const favoriteToRemove = favoriteProducts[0]

    const { statusCode } = await supertest(app).delete(`/favorites/${favoriteToRemove._id}`)

    expect(statusCode).toBe(401)
  })
})