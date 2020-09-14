import { Request, Response } from 'express'

import CommandService from '../services/CommandService'

const CommandController = {
  processQuotation: (request: Request, response: Response) => {
    const { command, args } = request.body

    CommandService[command](args)

    response.status(200).send()
  }
}

export default CommandController
