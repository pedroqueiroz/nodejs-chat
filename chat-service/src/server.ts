import http from 'http'
import { EventEmitter } from 'events'
import { createConnection } from 'typeorm'

import app from './app'
import config from './config'
import { initWebSocketServer } from './sockets'
import { initBot } from './messageQueueConsumers'

const { port } = config

const server = http.createServer(app)

createConnection()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server started on port ${port}`)
    })

    const eventEmitter = new EventEmitter()

    initWebSocketServer(server, eventEmitter)
    initBot(eventEmitter)
  })
  .catch((error) => console.log(error))
