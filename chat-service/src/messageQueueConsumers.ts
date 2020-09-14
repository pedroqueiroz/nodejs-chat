import amqp from 'amqplib/callback_api'

import config from './config'
import { broadcastMessage } from './sockets'
import { buildChatResponse } from './util/chatResponse'

const { rabbitmq } = config

export const initBot = () => {
  amqp.connect(rabbitmq.url, (err, connection) => {
    connection.createChannel((err, channel) => {
      channel.assertQueue(rabbitmq.queue, {
        durable: false
      })

      channel.consume(
        rabbitmq.queue,
        (message) => {
          broadcastMessage(
            buildChatResponse({
              userName: 'Stock Bot',
              message: message.content.toString()
            })
          )
        },
        { noAck: true }
      )
    })
  })
}
