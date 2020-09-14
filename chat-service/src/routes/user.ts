import { Router } from 'express'

import UserController from '../controllers/UserController'
import { checkJwt } from '../middlewares/checkJwt'
import { checkRole } from '../middlewares/checkRole'

const router = Router()

router.get('/', checkJwt, checkRole(['ADMIN']), UserController.listAll)

router.post('/', checkJwt, checkRole(['ADMIN']), UserController.createUser)

export default router
