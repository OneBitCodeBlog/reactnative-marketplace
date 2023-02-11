const path = require("node:path")

require("dotenv").config({
  path: path.resolve(process.cwd(), ".env.test")
})