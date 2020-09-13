import http from 'http'
import WebSocket from 'ws'
import amqp from 'amqplib/callback_api'
import { createConnection } from 'typeorm'

import app from './app'
import { processMessage } from './services/messageProcessorService'
import config from './config'

const { rabbitmq, port } = config

const server = http.createServer(app)
const webSocketServer = new WebSocket.Server({ server })

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

    amqp.connect(rabbitmq.url, (err, connection) => {
      connection.createChannel((err, channel) => {
        channel.assertQueue(rabbitmq.queue, {
          durable: false,
        })

        channel.consume(
          rabbitmq.queue,
          (message) => {
            broadcastMessage(buildBotResponse(message.content.toString()))
          },
          { noAck: true }
        )
      })
    })

    server.listen(port, () => {
      console.log(`Server started on port ${port}`)
    })
  })
  .catch((error) => console.log(error))
