import app from './app'

import config from './config'
import { initMessageQueue } from './messageQueue'

const { port } = config

app.listen(port, () => {
  console.log(`Started bot on port ${port}`)
})

initMessageQueue()
