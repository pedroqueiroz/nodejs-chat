export const parseCSV = (data: string, ignoreHeader: boolean = false) => {
  const lines: Array<string> = data.split('\n')

  if (ignoreHeader) {
    lines.shift()
  }

  return lines.filter((line) => line.length > 0).map((line) => line.split(','))
}
