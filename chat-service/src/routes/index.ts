import express from 'express'

import root from './root'
import auth from './auth'
import user from './user'
import posts from './posts'

const router = express.Router()

router.use(root)
router.use('/auth', auth)
router.use('/user', user)
router.use('/posts', posts)

export default router
