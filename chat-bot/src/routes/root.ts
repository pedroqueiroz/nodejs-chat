import express from 'express'

const router = express.Router()

router.get('/', (_, response) => {
  response.send('Hello world!')
})

export default router
