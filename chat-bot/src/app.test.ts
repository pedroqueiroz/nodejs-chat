import request from 'supertest'

import CommandService from './services/CommandService'
import { publishToQueue } from './messageQueue'

import app from './app'

jest.mock('./services/CommandService')
jest.mock('./messageQueue')

const asMock = (obj: any): jest.Mock => obj as jest.Mock

describe('POST /command', () => {
  beforeEach(() => {
    asMock(CommandService.stock).mockReturnValue(
      'APPL.US quote is $112 per share.'
    )
    asMock(publishToQueue).mockReturnValue(null)
  })
  it('responds with 200', function (done) {
    request(app)
      .post('/command')
      .send({ command: 'stock', args: { stockCode: 'aapl.us' } })
      .expect(200, done)
  })
})
