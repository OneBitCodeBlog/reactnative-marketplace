require('dotenv').config()
const database = require('./database')

const app = require("./app")

const PORT = process.env.PORT || 3000

database.connect()

app.listen(PORT, () => {
  console.log(`Server started successfully! Listening on: http://localhost:${PORT}`)
})