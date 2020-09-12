import express from 'express'

const app = express()

const PORT = 9000

app.get('/', (req, res) => {
  res.send('I am a bot!')
})

app.listen(PORT, () => {
  console.log(`Started bot on port ${PORT}`)
})
