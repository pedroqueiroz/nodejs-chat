import express from 'express'

const router = express.Router()

router.get('/', (_, response) => {
  response.send('Hi, I am a bot!')
})

export default router
