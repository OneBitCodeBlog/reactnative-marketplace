const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

function connect() {
  mongoose.connect(process.env.DATABASE_URL)
  return mongoose.connection
}

module.exports = {
  connect
}