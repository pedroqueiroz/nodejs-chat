import axios from 'axios'

import { getQuotePerShare } from './stockService'

jest.mock('axios')

const asMock = (obj: any): jest.Mock => obj as jest.Mock

const STOOQ_API_RESULT =
  'Symbol,Date,Time,Open,High,Low,Close,Volume\n' +
  'AAPL.US,2020-09-11,22:00:04,114.57,115.23,110,112,180860325'

describe('CSV Service', () => {
  it('should mount stooq url with stock code', async () => {
    asMock(axios.get).mockResolvedValue({ data: STOOQ_API_RESULT })

    const stockShare = await getQuotePerShare('aapl.us')

    expect(stockShare).toEqual({ title: 'AAPL.US', quote: '112' })
  })
})
