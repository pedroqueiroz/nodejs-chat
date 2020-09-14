import express from 'express'

import { checkJwt } from '../middlewares/checkJwt'
import PostController from '../controllers/PostController'

const router = express.Router()

router.post('/', checkJwt, PostController.process)
router.get('/', checkJwt, PostController.list)

export default router
