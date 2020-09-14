import http from 'http'
import { createConnection } from 'typeorm'

import app from './app'
import config from './config'
import { initWebSocketServer } from './sockets'
import { initBot } from './bot'

const { port } = config

const server = http.createServer(app)

createConnection()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server started on port ${port}`)
    })

    initWebSocketServer(server)
    initBot()
  })
  .catch((error) => console.log(error))
