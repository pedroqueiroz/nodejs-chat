import express from 'express'

import { publishToQueue } from './services/messageQueueService'
import { getQuotePerShare } from './services/stockService'
import { buildChatMessage } from './services/chatMessageParserService'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('I am a bot!')
})

router.post('/share-quotation', (req, res) => {
  const { stockCode } = req.body

  getQuotePerShare(stockCode)
    .then((quote) => {
      publishToQueue(buildChatMessage(quote))
    })
    .catch((error) => console.log(error))

  res.status(200).send()
})

export default router
