import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'

import config from '../config'

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['auth']

  let jwtPayload

  try {
    jwtPayload = jwt.verify(token, config.jwt.secret)
    res.locals.jwtPayload = jwtPayload
  } catch (error) {
    res.status(401).send()
    return
  }

  const { userId, userName } = jwtPayload
  const newToken = jwt.sign({ userId, userName }, config.jwt.secret, {
    expiresIn: config.jwt.expirationTime
  })
  res.setHeader('token', newToken)

  next()
}
