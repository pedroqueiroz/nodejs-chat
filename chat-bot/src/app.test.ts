import request from 'supertest'

import app from './app'
import { getQuotePerShare } from './services/stockService'
import { publishToQueue } from './services/messageQueueService'

jest.mock('./services/stockService')
jest.mock('./services/messageQueueService')

const asMock = (obj: any): jest.Mock => obj as jest.Mock

describe('POST /share-quotation', () => {
  beforeEach(() => {
    asMock(getQuotePerShare).mockResolvedValue({
      title: 'AAPL.US',
      quote: '92'
    })
    asMock(publishToQueue).mockReturnValue(null)
  })
  it('responds with 200', function (done) {
    request(app).post('/share-quotation').expect(200, done)
  })
})
