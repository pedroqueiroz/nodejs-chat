import messageQueue from 'amqplib/callback_api'

import config from './config'
import { broadcastMessage } from './sockets'
import { buildChatResponse } from './util/chatResponse'

const { rabbitmq } = config
const BOT_NAME = 'Bot'

export const initBot = () => {
  messageQueue.connect(rabbitmq.url, (_, connection) => {
    connection.createChannel((_, channel) => {
      channel.assertQueue(rabbitmq.queue, {
        durable: false
      })

      channel.consume(
        rabbitmq.queue,
        (message) => {
          broadcastMessage(
            buildChatResponse({
              userName: BOT_NAME,
              message: message.content.toString()
            })
          )
        },
        { noAck: true }
      )
    })
  })
}
