import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import User from '../entities/User'

import { generateJwtToken } from '../util/jwtToken'

const AuthController = {
  login: async (request: Request, response: Response) => {
    const { userName, password } = request.body

    if (!(userName && password)) {
      response.status(400).send()
    }

    const userRepository = getRepository(User)

    let user: User
    try {
      user = await userRepository.findOneOrFail({ where: { userName } })
    } catch (error) {
      response.status(401).send()
      return
    }

    if (!user.validatePassword(password)) {
      response.status(401).send()
      return
    }

    response.send(
      generateJwtToken({ userId: user.id, userName: user.userName })
    )
  }
}

export default AuthController
