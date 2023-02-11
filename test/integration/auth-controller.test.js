const database = require("../../src/database")
const supertest = require("supertest")
const app = require("../../src/app")
const userFactory = require("../../src/models/factories/user-factory")

describe("auth controller", () => {
  let connection

  beforeAll((done) => {
    connection = database.connect()
    connection.once("open", () => done())
    connection.on("error", (err) => done(err))
  })

  beforeEach((done) => {
    connection.db.listCollections({ name: "users" }).next((err, collection) => {
      if (collection) {
        connection.db.dropCollection("users")
          .then(() => done())
          .catch((err) => done(err))
      } else {
        done(err)
      }
    })
  })

  afterAll(() => {
    connection.close()
  })

  test("should register a user with only email and password", async () => {
    const userInput = {
      email: "user@email.com",
      password: "123456"
    }

    const response = await supertest(app).post("/register").send(userInput)
    const createdUser = await connection.models.User.findOne({ email: userInput.email })

    expect(response.statusCode).toBe(201)
    expect(createdUser._id).toBeDefined()
    expect(createdUser.email).toBe(userInput.email)
  })

  test("should register a user with name and phone", async () => {
    const userInput = {
      name: "User Name",
      email: "user@email.com",
      password: "123456",
      phone: "5521987654321"
    }

    const response = await supertest(app).post("/register").send(userInput)
    const createdUser = await connection.models.User.findOne({ email: userInput.email })

    expect(response.statusCode).toBe(201)
    expect(createdUser._id).toBeDefined()
    expect(createdUser.name).toBe(userInput.name)
    expect(createdUser.email).toBe(userInput.email)
    expect(createdUser.phone).toBe(userInput.phone)
  })

  test("should not register user without email", async () => {
    const userInput = {
      name: "User Name",
      email: "user@email.com",
      phone: "5521987654321"
    }

    const response = await supertest(app).post("/register").send(userInput)
    const createdUser = await connection.models.User.findOne({ email: userInput.email })

    expect(response.statusCode).toBe(400)
    expect(createdUser).toBeNull()
  })

  test("should not register user without password", async () => {
    const userInput = {
      name: "User Name",
      password: "123456",
      phone: "5521987654321"
    }

    const response = await supertest(app).post("/register").send(userInput)
    const createdUser = await connection.models.User.findOne({ name: userInput.name })

    expect(response.statusCode).toBe(400)
    expect(createdUser).toBeNull()
  })

  test("should login with valid credentials", async () => {
    const userInput = userFactory.build()
    const user = new connection.models.User(userInput)
    await user.save()

    const { statusCode, body } = await supertest(app).post("/login").send({ email: userInput.email, password: userInput.password})

    expect(statusCode).toBe(200)
    expect(body.token).toBeDefined()
  })

  test("should not login with invalid credentials", async () => {
    const userInput = userFactory.build()
    const user = new connection.models.User(userInput)
    await user.save()

    const { statusCode, body } = await supertest(app).post("/login").send({ email: userInput.email, password: "0000"})

    expect(statusCode).toBe(400)
    expect(body.token).toBeUndefined()
  })
})