import { Request, Response, NextFunction } from 'express'
import { getRepository } from 'typeorm'

import { User } from '../entities/User'

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.jwtPayload.userId

    const userRepository = getRepository(User)

    let user: User
    try {
      user = await userRepository.findOneOrFail(id)
    } catch (id) {
      res.status(401).send()

      return
    }

    if (!(roles.indexOf(user.role) > -1)) {
      res.status(401).send()
      return
    }

    next()
  }
}
