import express from 'express'

import root from './root'
import command from './command'

const router = express.Router()

router.use(root)
router.use('/command', command)

export default router
