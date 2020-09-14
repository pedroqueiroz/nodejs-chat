import WebSocket from 'ws'

import { processMessage } from './services/messageProcessorService'

export const initWebSocketServer = (server, eventEmitter) => {
  const webSocketServer = new WebSocket.Server({ server })

  const broadcastMessage = (message) => {
    webSocketServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message)
      }
    })
  }

  webSocketServer.on('connection', (webSocket) => {
    webSocket.on('message', async (message) => {
      await processMessage(message).catch((error) => console.log(error))
      broadcastMessage(message)
    })

    eventEmitter.on('newBotMessage', (message) => broadcastMessage(message))

    webSocket.send('Connection Stablished!')
  })
}
