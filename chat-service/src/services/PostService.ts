import axios from 'axios'
import { getRepository } from 'typeorm'

import config from '../config'
import Post from '../entities/Post'

const { bot } = config

const isCommand = (message: string): boolean => message.startsWith('/')

const isValidCommand = (command: string): boolean => command === '/stock'

const processCommand = async (message: string): Promise<void> => {
  const parsedMessage = message.split('=')
  const command = parsedMessage[0]

  if (isValidCommand(command)) {
    console.log('mandou a mensagem!')
    await axios.post(`${bot.url}/share-quotation`, {
      stockCode: parsedMessage[1]
    })
  }
}

const PostService = {
  save: async (post: Post) => {
    const { message } = post

    if (isCommand(message)) {
      await processCommand(message)
      return
    }

    getRepository(Post).save(post)
  }
}

export default PostService
