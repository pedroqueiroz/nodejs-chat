import app from './app'

import config from './config'

const { port } = config

app.listen(port, () => {
  console.log(`Started bot on port ${port}`)
})
