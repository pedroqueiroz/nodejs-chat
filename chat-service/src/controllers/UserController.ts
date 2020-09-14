import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'

import User from '../entities/User'

const UserController = {
  listAll: async (request: Request, response: Response) => {
    const userRepository = getRepository(User)
    const users = await userRepository.find({
      select: ['id', 'userName', 'role']
    })

    response.send(users)
  },
  createUser: async (request: Request, response: Response) => {
    const { userName, password, role } = request.body

    const user = new User()
    user.userName = userName
    user.password = password
    user.role = role

    const errors = await validate(user)

    if (errors.length > 0) {
      response.status(400).send(errors)
      return
    }

    const userRepository = getRepository(User)
    try {
      await userRepository.save(user)
    } catch (error) {
      response.status(409).send()
      return
    }

    response.status(201).send()
  }
}

export default UserController
