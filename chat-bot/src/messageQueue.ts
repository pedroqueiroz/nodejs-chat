import messageQueue from 'amqplib/callback_api'

import config from './config'

const { rabbitmq } = config

let channel = null

export const initMessageQueue = () => {
  messageQueue.connect(rabbitmq.url, (_, connection) => {
    connection.createChannel((_, thisChannel) => {
      channel = thisChannel
    })
  })
}

export const publishToQueue = (data: string): void => {
  channel.assertQueue(rabbitmq.queue, {
    durable: false
  })

  channel.sendToQueue(rabbitmq.queue, Buffer.from(data))
}

process.on('exit', () => {
  channel.close()
})
