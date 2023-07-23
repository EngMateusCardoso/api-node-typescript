import express from 'express'

const server = express()

server.get('/', (_, res) => {
  res.send('Hello, world!')
})

server.get('/api', (_, res) => {
  res.json({ api: 'up' })
})

server.get('/api/echo/:what', (req, res) => {
  res.json({ echo: req.params.what })
})

server.get('/api/echo/:what/:howmany', (req, res) => {
  const { what, howmany } = req.params
  const count = parseInt(howmany, 10) || 1
  const repeats = Array(count).fill(what).join(' ')
  res.json({ echo: repeats })
})

server.get('/api/sum/:num1/:num2', (req, res) => {
  const { num1, num2 } = req.params
  const sum = parseInt(num1, 10) + parseInt(num2, 10)
  res.json({ sum })
})

server.post('/api/post', (_, res) => {
  return res.send('POST request HEREEEE')
})

export default server
