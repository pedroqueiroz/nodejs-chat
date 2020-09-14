import express from 'express'

import root from './root'
import auth from './auth'
import user from './user'

const router = express.Router()

router.use(root)
router.use('/auth', auth)
router.use('/user', user)

export default router
