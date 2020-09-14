import express from 'express'

import CommandController from '../controllers/CommandController'

const router = express.Router()

router.post('/share-quotation', CommandController.processQuotation)

export default router
