const database = require("../../src/database")
const supertest = require("supertest")
const app = require("../../src/app")
const userFactory = require("../../src/models/factories/user-factory")
const addressFactory = require("../../src/models/factories/address-factory")
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_KEY

describe("auth controller", () => {
  let connection
  let token
  const user = userFactory.build()
  const addresses = addressFactory.buildList(3)

  beforeAll((done) => {
    connection = database.connect()
    connection.once("open", () => done())
    connection.on("error", (err) => done(err))
  })

  beforeEach(async () => {
    await connection.db.dropCollection("users")
    const userDoc = connection.models.User(user)
    userDoc.addresses.push(...addresses)
    await userDoc.save()
    if (!token) {
      token = jwt.sign({ _id: user._id, email: user.email }, jwtSecret, { expiresIn: "1d" })
    }
  })

  afterAll(() => {
    connection.close()
  })

  test("should return all addresses from authenticated user", async () => {
    const { statusCode, body } = await supertest(app).get("/addresses").set("Authorization", `Bearer ${token}`)

    expect(statusCode).toBe(200)
    expect(body.length).toBe(3)
  })

  test("should not work on unauthenticated users", async () => {
    const { statusCode } = await supertest(app).get("/addresses")

    expect(statusCode).toBe(401)
  })

  test("should save a new address", async () => {
    const newAddress = addressFactory.build()

    const { statusCode } = await supertest(app).post("/addresses").send(newAddress).set("Authorization", `Bearer ${token}`)
    const { addresses } = await connection.models.User.findById(user._id)

    expect(statusCode).toBe(201)
    expect(addresses.length).toBe(4)
  })

  test("should delete an address", async () => {
    const addressToDelete = addresses[0]

    const { statusCode } = await supertest(app).delete(`/addresses/${addressToDelete._id}`).set("Authorization", `Bearer ${token}`)
    const updatedUser = await connection.models.User.findById(user._id)

    expect(statusCode).toBe(204)
    expect(updatedUser.addresses.length).toBe(2)
    expect(updatedUser.addresses).not.toContainEqual(addressToDelete)
  })
})