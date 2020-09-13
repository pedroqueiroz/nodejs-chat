import amqp from 'amqplib/callback_api'

const RABBITMQ_URL = 'amqp://localhost:5672'
const QUEUE_NAME = 'shareQuoteMessage'

let channel = null

amqp.connect(RABBITMQ_URL, (err, connection) => {
  connection.createChannel((err, thisChannel) => {
    channel = thisChannel
  })
})

export const publishToQueue = async (data: string) => {
  channel.assertQueue(QUEUE_NAME, {
    durable: false,
  })

  channel.sendToQueue(QUEUE_NAME, Buffer.from(data))
}

process.on('exit', () => {
  channel.close()
})
