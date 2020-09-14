import amqp from 'amqplib/callback_api'

import config from './config'

const { rabbitmq } = config

const buildBotResponse = (message: string) =>
  JSON.stringify({
    userName: 'Stock Bot',
    message
  })

export const initBot = (eventEmitter) => {
  amqp.connect(rabbitmq.url, (err, connection) => {
    connection.createChannel((err, channel) => {
      channel.assertQueue(rabbitmq.queue, {
        durable: false
      })

      channel.consume(
        rabbitmq.queue,
        (message) => {
          eventEmitter.emit(
            'newBotMessage',
            buildBotResponse(message.content.toString())
          )
        },
        { noAck: true }
      )
    })
  })
}
