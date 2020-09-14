import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { getRepository } from 'typeorm'

import { User } from '../entities/User'
import config from '../config'

const AuthController = {
  login: async (req: Request, res: Response) => {
    const { userName, password } = req.body
    if (!(userName && password)) {
      res.status(400).send()
    }

    const userRepository = getRepository(User)

    let user: User
    try {
      user = await userRepository.findOneOrFail({ where: { userName } })
    } catch (error) {
      res.status(401).send()
      return
    }

    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send()
      return
    }

    const token = jwt.sign(
      { userId: user.id, userName: user.userName },
      config.jwt.secret,
      { expiresIn: config.jwt.expirationTime }
    )

    res.send(token)
  }
}

export default AuthController
