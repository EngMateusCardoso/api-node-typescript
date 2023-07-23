import { Router} from 'express'
import { StatusCodes } from 'http-status-codes'

const router = Router()

router.get('/', (_, res) => {
  res.send('Hello, world!')
})

router.get('/api', (_, res) => {
  res.json({ api: 'up' })
})

router.get('/api/echo/:what', (req, res) => {
  res.json({ echo: req.params.what })
})

router.get('/api/echo/:what/:howmany', (req, res) => {
  const { what, howmany } = req.params
  const count = parseInt(howmany, 10) || 1
  const repeats = Array(count).fill(what).join(' ')
  res.json({ echo: repeats })
})

router.get('/api/sum/:num1/:num2', (req, res) => {
  const { num1, num2 } = req.params
  const sum = parseInt(num1, 10) + parseInt(num2, 10)
  res.json({ sum })
})

router.post('/api/post', (req, res) => {
  return res.status(StatusCodes.ACCEPTED).json(req.body)
})

export default router