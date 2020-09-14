import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'

import config from '../config'
import { generateJwtToken } from '../util/jwtToken'

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['auth']

  let jwtPayload

  try {
    jwtPayload = jwt.verify(token, config.jwt.secret)
  } catch (error) {
    res.status(401).send()
    return
  }

  res.locals.jwtPayload = jwtPayload
  res.setHeader('token', generateJwtToken(jwtPayload))

  next()
}
