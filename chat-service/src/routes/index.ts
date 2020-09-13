import express from 'express'

import rootRouter from './root'

const router = express.Router()

router.use(rootRouter)

export default router
