import axios from 'axios'

import { publishToQueue } from '../messageQueue'
import { ShareQuotation } from '../types'
import { parseCSV } from '../utils/csvParser'
import { buildStooqUrl } from '../utils/urlUtils'

const SHARE_ROW = 0
const SYMBOL_COLUMN = 0
const QUOTE_COLUMN = 6

export const getQuotePerShare = async (
  stockCode: string
): Promise<ShareQuotation> => {
  const { data } = await axios.get(buildStooqUrl(stockCode))

  const parsed = parseCSV(data, true)
  const row = parsed[SHARE_ROW]

  return { title: row[SYMBOL_COLUMN], quote: row[QUOTE_COLUMN] }
}

const CommandService = {
  stock: ({ stockCode }) => {
    getQuotePerShare(stockCode)
      .then((shareQuotation) => {
        publishToQueue(
          `${shareQuotation.title} quote is $${shareQuotation.quote} per share.`
        )
      })
      .catch((error) => console.log(error))
  }
}

export default CommandService
