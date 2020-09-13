import amqp from 'amqplib/callback_api'

import config from '../config'

const { rabbitmq } = config

let channel = null

amqp.connect(rabbitmq.url, (err, connection) => {
  connection.createChannel((err, thisChannel) => {
    channel = thisChannel
  })
})

export const publishToQueue = (data: string): void => {
  channel.assertQueue(rabbitmq.queue, {
    durable: false,
  })

  channel.sendToQueue(rabbitmq.queue, Buffer.from(data))
}

process.on('exit', () => {
  channel.close()
})
