
const http = require('node:http')
const { Server } = require('socket.io')
const app = require('./app')
const websocket = require('./websocket')

const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

io.on('connection', websocket.setup)

module.exports = server