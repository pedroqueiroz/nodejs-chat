import { parseCSV } from './csvParser'

describe('CSV Parser', () => {
  it('should parse csv with no header', () => {
    const parsed = parseCSV('Title,Name,Country\nLord,Phillip,England', true)

    expect(parsed).toEqual([['Lord', 'Phillip', 'England']])
  })

  it('should parse csv with header', () => {
    const parsed = parseCSV('Title,Name,Country\nLord,Phillip,England')

    expect(parsed).toEqual([
      ['Title', 'Name', 'Country'],
      ['Lord', 'Phillip', 'England'],
    ])
  })
})
