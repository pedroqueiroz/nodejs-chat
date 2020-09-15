import request from 'supertest'

import * as CommandService from './services/CommandService'
import { publishToQueue } from './messageQueue'

import app from './app'

jest.mock('./messageQueue')

const asMock = (obj: any): jest.Mock => obj as jest.Mock

describe('App', () => {
  describe('POST /command', () => {
    beforeEach(() => {
      asMock(publishToQueue).mockReturnValue(null)
    })
    it('should respond with 200 when the command is well formed', function (done) {
      jest.spyOn(CommandService, 'getQuotePerShare').mockResolvedValue({
        title: 'AAPL.US',
        quote: '112'
      })

      request(app)
        .post('/command')
        .send({ command: 'stock', args: { stockCode: 'aapl.us' } })
        .expect(200, done)
    })

    it('should respond with 400 when the command does not exist', function (done) {
      request(app).post('/command').send({ command: 'play' }).expect(400, done)
    })

    it('should respond with 400 when the command does contain the expected arguments', function (done) {
      request(app)
        .post('/command')
        .send({ command: 'stock', args: undefined })
        .expect(400, done)
    })
  })
})
