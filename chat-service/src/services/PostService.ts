import axios from 'axios'
import { getRepository } from 'typeorm'

import config from '../config'
import Post from '../entities/Post'

const { bot } = config

const isCommand = (message: string): boolean => message.startsWith('/')

const processCommand = async (message: string): Promise<void> => {
  const parsedMessage = message.split('=')
  const command = parsedMessage[0].slice(1)
  const stockCode = parsedMessage[1]

  await axios.post(`${bot.url}/command`, {
    command,
    args: { stockCode }
  })
}

const PostService = {
  save: async (post: Post) => {
    const { message } = post

    if (isCommand(message)) {
      await processCommand(message)
      return
    }

    await getRepository(Post).save(post)
  },
  list: async (): Promise<Array<Post>> => {
    const result = await getRepository(Post).find({
      select: ['userName', 'message'],
      order: { timestamp: 'DESC' },
      take: 50
    })

    return result.reverse()
  }
}

export default PostService
