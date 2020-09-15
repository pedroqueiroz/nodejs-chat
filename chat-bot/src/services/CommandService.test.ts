import axios from 'axios'

import { getQuotePerShare } from './CommandService'

jest.mock('axios')

const asMock = (obj: any): jest.Mock => obj as jest.Mock

const SUCCESS_STOOQ_API_RESULT =
  'Symbol,Date,Time,Open,High,Low,Close,Volume\n' +
  'AAPL.US,2020-09-11,22:00:04,114.57,115.23,110,112,180860325'

const ERROR_STOOQ_API_RESULT =
  'Symbol,Date,Time,Open,High,Low,Close,Volume\n' +
  'AAAAPL.US,N/D,N/D,N/D,N/D,N/D,N/D,N/D'

describe('Command Service', () => {
  it('should get correct quotation', async () => {
    asMock(axios.get).mockResolvedValue({ data: SUCCESS_STOOQ_API_RESULT })

    const quotePerShare = await getQuotePerShare('aapl.us')

    expect(quotePerShare).toEqual({ title: 'AAPL.US', quote: '112' })
  })

  it('should throw error if title does not exist', async () => {
    asMock(axios.get).mockResolvedValue({ data: ERROR_STOOQ_API_RESULT })

    try {
      await getQuotePerShare('aapl.us')
    } catch (error) {
      expect(error.message).toEqual('No quotation found for this stock code :(')
    }

    expect.hasAssertions()
  })
})
