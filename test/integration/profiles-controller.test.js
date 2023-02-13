const database = require("../../src/database")
const supertest = require("supertest")
const app = require("../../src/app")
const userFactory = require("../../src/models/factories/user-factory")
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_KEY

describe("auth controller", () => {
  let connection
  let token
  let user = userFactory.build({ password: "123456" })

  beforeAll((done) => {
    connection = database.connect()
    connection.once("open", () => done())
    connection.on("error", (err) => done(err))
  })

  beforeEach(async () => {
    await connection.db.dropCollection("users")
    const userDoc = connection.models.User(user)
    await userDoc.save()
    if (!token) {
      token = jwt.sign({ _id: user._id, email: user.email }, jwtSecret, { expiresIn: "1d" })
    }
  })

  afterAll(() => {
    connection.close()
  })

  test("should update the authenticated user name, email and phone props", async () => {
    const updateProps = {
      name: "Luke Skywalker",
      email: "luke@email.com"
    }

    const { statusCode } = await supertest(app).put("/profile").send(updateProps).set("Authorization", `Bearer ${token}`)
    const updatedUser = await connection.models.User.findById(user._id)

    expect(statusCode).toBe(204)
    expect(updatedUser.name).toBe(updateProps.name)
    expect(updatedUser.email).toBe(updateProps.email)
    expect(updatedUser.phone).toBe(user.phone)
  })

  test("should update the authenticated user password", async () => {
    const payload = { password: "123456", newPassword: "qwerty" }

    const { statusCode } = await supertest(app).put("/profile/password").send(payload).set("Authorization", `Bearer ${token}`)
    const updatedUser = await connection.models.User.findById(user._id)

    expect(statusCode).toBe(204)
    expect(updatedUser.checkPassword("qwerty")).toBe(true)
  })
})