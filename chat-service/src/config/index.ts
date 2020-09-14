export default {
  port: 8080,
  rabbitmq: {
    url: 'amqp://localhost:5672',
    queue: 'share-quotation-message'
  },
  bot: {
    url: 'http://localhost:9000'
  },
  jwt: {
    secret: 'kO^*5euKhQ1u',
    expirationTime: '1h'
  }
}
