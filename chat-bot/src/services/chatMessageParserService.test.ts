import { buildChatMessage } from './chatMessageParserService'

describe('CSV Service', () => {
  it('should build chat message from share quotation', async () => {
    const shareQuotation = { title: 'APPL.US', quote: '93.42' }

    expect(buildChatMessage(shareQuotation)).toEqual(
      'APPL.US quote is $93.42 per share.'
    )
  })
})
