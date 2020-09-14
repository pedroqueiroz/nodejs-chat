import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'

import { User } from '../entities/User'

const UserController = {
  createUser: async (req: Request, res: Response) => {
    const { userName, password, role } = req.body

    const user = new User()
    user.userName = userName
    user.password = password
    user.role = role

    const errors = await validate(user)

    if (errors.length > 0) {
      res.status(400).send(errors)
      return
    }

    const userRepository = getRepository(User)
    try {
      await userRepository.save(user)
    } catch (error) {
      res.status(409).send()
      return
    }

    res.status(201).send()
  }
}

export default UserController
