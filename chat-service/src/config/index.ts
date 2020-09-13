export default {
  port: 8080,
  rabbitmq: {
    url: 'amqp://localhost:5672',
    queue: 'share-quotation-message',
  },
  bot: {
    url: 'http://localhost:9000',
  },
}
