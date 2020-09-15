import axios from 'axios'

import { publishToQueue } from '../messageQueue'
import { ShareQuotation } from '../types'
import { parseCSV } from '../utils/csvParser'
import { buildStooqUrl } from '../utils/urlUtils'

const SHARE_ROW = 0
const SYMBOL_COLUMN = 0
const QUOTE_COLUMN = 6
const EMPTY_COLUMN = 'N/D'

export const getQuotePerShare = async (
  stockCode: string
): Promise<ShareQuotation> => {
  const { data } = await axios.get(buildStooqUrl(stockCode))

  const parsed = parseCSV(data, true)
  const row = parsed[SHARE_ROW]

  const quote = row[QUOTE_COLUMN]

  if (quote === EMPTY_COLUMN) {
    throw new Error('No quotation found for this stock code :(')
  }

  return { title: row[SYMBOL_COLUMN], quote }
}

const CommandService = {
  stock: ({ stockCode }) => {
    getQuotePerShare(stockCode)
      .then((shareQuotation) => {
        publishToQueue(
          `${shareQuotation.title} quote is $${shareQuotation.quote} per share.`
        )
      })
      .catch((error) => publishToQueue(error.message))
  }
}

export default CommandService
