import { Request, Response } from 'express'
import { validate } from 'class-validator'

import Post from '../entities/Post'
import PostService from '../services/PostService'
import { broadcastMessage } from '../sockets'
import { buildChatResponse } from '../util/chatResponse'

const PostController = {
  process: async (request: Request, response: Response) => {
    const { userName, message } = request.body

    const post = new Post()
    post.userName = userName
    post.message = message
    post.timestamp = new Date()

    const errors = await validate(post)

    if (errors.length > 0) {
      response.status(400).send(errors)
      return
    }

    PostService.save(post).catch((error) => console.log(error))

    broadcastMessage(buildChatResponse({ userName, message }))

    response.status(200).send()
  },
  list: async (request: Request, response: Response) => {
    response.status(200).json(await PostService.list())
  }
}

export default PostController
