import axios from 'axios'

const BOT_URL = 'http://localhost:9000'

const isCommand = (message: string): boolean => message.startsWith('/')

const isValidCommand = (command: string): boolean => command === '/stock'

const processCommand = async (message: string): Promise<void> => {
  const parsedMessage = message.split('=')
  const command = parsedMessage[0]

  if (isValidCommand(command)) {
    await axios.post(`${BOT_URL}/share-quotation`, {
      stockCode: parsedMessage[1],
    })
  }
}

export const processMessage = async (message: string) => {
  const actualMessage = JSON.parse(message).message

  if (isCommand(actualMessage)) {
    await processCommand(actualMessage)
  }
}
