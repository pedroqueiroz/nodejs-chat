import express from 'express'
import bodyParser from 'body-parser'
import 'reflect-metadata'
import cors from 'cors'
import helmet from 'helmet'

import router from './routes'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(helmet())

app.use(router)

export default app
