import express from 'express'
import bodyParser from 'body-parser'

import { publishToQueue } from './services/messageQueueService'
import { getQuotePerShare } from './services/stockService'
import { buildChatMessage } from './services/chatMessageParserService'

const PORT = 9000

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('I am a bot!')
})

app.post('/share-quote', (req, res) => {
  const { stockCode } = req.body

  getQuotePerShare(stockCode)
    .then(async (quote) => {
      await publishToQueue(buildChatMessage(quote))
    })
    .catch((error) => console.log(error))

  res.status(200).send()
})

app.listen(PORT, () => {
  console.log(`Started bot on port ${PORT}`)
})

export default app
