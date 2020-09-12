import { buildStooqUrl } from './urlUtils'

describe('Stooq Util', () => {
  it('should mount stooq url with stock code', () => {
    expect(buildStooqUrl('aapl.us')).toEqual(
      'https://stooq.com/q/l/?s=aapl.us&f=sd2t2ohlcv&h&e=csv'
    )
  })
})
