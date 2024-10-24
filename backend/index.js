import 'dotenv/config'

import morgan from 'morgan'
import express from 'express'

const api = express()

api.use(morgan('dev'))
api.use(express.json())
api.disable('x-powered-by')


api.listen(process.env.API_PORT, async (err) => {
    if (err) throw new Error('Cannot start API')
    console.log('*'.repeat(30))
    console.log(`API Running on port ${process.env.API_PORT}`)
    console.log('*'.repeat(30))
  })