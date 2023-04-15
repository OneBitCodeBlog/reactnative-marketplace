require('dotenv').config()
const database = require('./database')
const server = require('./server')

const PORT = process.env.PORT || 3000

database.connect()

server.listen(PORT, () => {
  console.log(`Server started successfully! Listening on: http://localhost:${PORT}`)
})