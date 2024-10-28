import 'dotenv/config'

import morgan from 'morgan'
import express from 'express'
import cors from 'cors'
import { resetPhrase } from './api/db/index.db.js'
import { getHistory } from './api/controllers/history.controller.js'
import { handleGenerateText } from './api/controllers/index.controller.js'
import { testPhrase } from './api/controllers/phrase.controller.js'

const api = express()

api.use(morgan('dev'))
api.use(express.json())
api.use(
  cors({
    origin: '*',
  })
)
api.disable('x-powered-by')


try {
  //await resetPhrase()
  console.log("Length phrase: ", await testPhrase())
} catch (err) {
  console.error(err)
}

api.get('/history', getHistory)
api.post('/generate-text', handleGenerateText)

api.listen(process.env.API_PORT, async (err) => {
  if (err) throw new Error('No se puede iniciar la API')
  console.log('*'.repeat(30))
  console.log(`API ejecutándose en el puerto: ${process.env.API_PORT}`)
  console.log('*'.repeat(30))
})