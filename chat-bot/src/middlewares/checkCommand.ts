import { Request, Response, NextFunction } from 'express'

import CommandService from '../services/CommandService'

export const checkCommand = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { command } = request.body

  const commands = Object.keys(CommandService)

  if (commands.indexOf(command) == -1) {
    response.status(400).send('Command does not exist!')
  }

  next()
}
