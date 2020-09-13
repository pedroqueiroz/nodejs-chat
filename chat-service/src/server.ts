import http from 'http'
import WebSocket from 'ws'
import amqp from 'amqplib/callback_api'
import { createConnection } from 'typeorm'

import app from './app'
import { processMessage } from './services/messageProcessorService'

const server = http.createServer(app)
const webSocketServer = new WebSocket.Server({ server })

const RABBITMQ_URL = 'amqp://localhost:5672'
const QUEUE_NAME = 'share-quotation-message'
const PORT = 8080

const buildBotResponse = (message: string) =>
  JSON.stringify({
    userName: 'Stock Bot',
    message,
  })

const broadcastMessage = (message) => {
  webSocketServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message)
    }
  })
}

createConnection()
  .then(async (connection) => {
    webSocketServer.on('connection', (webSocket) => {
      webSocket.on('message', async (message) => {
        await processMessage(message).catch((error) => console.log(error))
        broadcastMessage(message)
      })

      webSocket.send('Connection Stablished!')
    })

    amqp.connect(RABBITMQ_URL, (err, connection) => {
      connection.createChannel((err, channel) => {
        channel.assertQueue(QUEUE_NAME, {
          durable: false,
        })

        channel.consume(
          QUEUE_NAME,
          (message) => {
            broadcastMessage(buildBotResponse(message.content.toString()))
          },
          { noAck: true }
        )
      })
    })

    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  })
  .catch((error) => console.log(error))
