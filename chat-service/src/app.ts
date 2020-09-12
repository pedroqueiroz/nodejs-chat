import express from 'express'
import http from 'http'
import WebSocket from 'ws'

const app = express()

const PORT = 8080

app.get('/', (req, res) => {
  res.send('Hello world!')
})

const server = http.createServer(app)

const webSocketServer = new WebSocket.Server({ server })

webSocketServer.on('connection', (webSocket) => {
  webSocket.on('message', (message) => {
    webSocket.send(`You sent: ${message}`)
  })

  webSocket.send('Connection Stablished!')
})

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
