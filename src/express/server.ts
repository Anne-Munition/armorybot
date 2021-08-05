import express from 'express'
import morgan from 'morgan'
import log from '../logger'
import embedRoute from './routes/embed'

const app = express()

app.set('view engine', 'pug')
app.use(morgan('dev'))

app.get('/', (req, res, next) => {
  res.json({ message: 'Hello World!' })
})

app.use('/embed', embedRoute)

export function start(): void {
  app.listen(3000)
  log.info('Listening on port 3000')
}

export function stop(): void {
  // Do Something
}
