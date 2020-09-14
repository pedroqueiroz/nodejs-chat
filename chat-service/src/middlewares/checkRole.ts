import { Response, NextFunction } from 'express'
import { getRepository } from 'typeorm'

import User from '../entities/User'

export const checkRole = (roles: Array<string>) => {
  return async (_, response: Response, next: NextFunction) => {
    const id = response.locals.jwtPayload.userId

    const userRepository = getRepository(User)

    let user: User
    try {
      user = await userRepository.findOneOrFail(id)
    } catch (id) {
      response.status(401).send()

      return
    }

    if (!(roles.indexOf(user.role) > -1)) {
      response.status(401).send()
      return
    }

    next()
  }
}
