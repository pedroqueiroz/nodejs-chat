import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'

import config from '../config'
import { generateJwtToken } from '../util/jwtToken'

export const checkJwt = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers['auth']

  let jwtPayload

  try {
    jwtPayload = jwt.verify(token, config.jwt.secret)
  } catch (error) {
    response.status(401).send()
    return
  }

  response.locals.jwtPayload = jwtPayload
  response.setHeader('token', generateJwtToken(jwtPayload))

  next()
}
