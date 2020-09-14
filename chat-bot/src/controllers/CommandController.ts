import { Request, Response } from 'express'

import { publishToQueue } from '../services/messageQueueService'
import { getQuotePerShare } from '../services/stockService'
import { buildChatMessage } from '../services/chatMessageParserService'

const CommandController = {
  processQuotation: (request: Request, response: Response) => {
    const { stockCode } = request.body

    getQuotePerShare(stockCode)
      .then((quote) => {
        publishToQueue(buildChatMessage(quote))
      })
      .catch((error) => console.log(error))

    response.status(200).send()
  }
}

export default CommandController
