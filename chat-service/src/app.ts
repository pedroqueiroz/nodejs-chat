import express from 'express'
import bodyParser from 'body-parser'
import 'reflect-metadata'

import router from './routes'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(router)

export default app
