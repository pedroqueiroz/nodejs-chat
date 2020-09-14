import WebSocket from 'ws'

let webSocketServer

export const initWebSocketServer = (server) => {
  webSocketServer = new WebSocket.Server({ server })

  webSocketServer.on('connection', (webSocket) => {
    console.log('WebSocket Connection Stablished!')
  })
}

export const broadcastMessage = (message) => {
  webSocketServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message)
    }
  })
}
