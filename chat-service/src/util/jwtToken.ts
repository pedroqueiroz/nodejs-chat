import { sign } from 'jsonwebtoken'

import config from '../config'

export const generateJwtToken = ({ userId, userName }) =>
  sign({ userId, userName }, config.jwt.secret, {
    expiresIn: config.jwt.expirationTime
  })
