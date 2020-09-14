import express from 'express'

import root from './root'
import auth from './auth'

const router = express.Router()

router.use(root)
router.use('/auth', auth)

export default router
