import express from 'express'

import CommandController from '../controllers/CommandController'
import { checkCommand } from '../middlewares/checkCommand'

const router = express.Router()

router.post('/', checkCommand, CommandController.processQuotation)

export default router
