import express from 'express'

import CommandController from '../controllers/CommandController'

const router = express.Router()

router.post('/', CommandController.processQuotation)

export default router
