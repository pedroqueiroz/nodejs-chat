import { Request, Response } from 'express'

import CommandService from '../services/CommandService'

const CommandController = {
  processQuotation: (request: Request, response: Response) => {
    const { command, args } = request.body

    try {
      CommandService[command](args)
    } catch (error) {
      response.status(400).send(`Wrong arguments for ${command} command!`)
    }

    response.status(200).send()
  }
}

export default CommandController
