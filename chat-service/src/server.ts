import http from 'http'
import WebSocket from 'ws'

import app from './app'

const server = http.createServer(app)
const webSocketServer = new WebSocket.Server({ server })
const PORT = 8080

webSocketServer.on('connection', (webSocket) => {
  webSocket.on('message', (message) => {
    webSocketServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message)
      }
    })
  })

  webSocket.send('Connection Stablished!')
})

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
