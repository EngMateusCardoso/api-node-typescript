import { Router} from 'express'
import { cidadesController } from '../../controllers'

// O router é um middleware que permite eu criar rotas para o meu servidor
// Depois de criar as rotas, eu preciso dizer ao meu servidor que ele vai usar essas rotas
const router = Router()

router.get('/', (_, res) => {
  res.send('working!')
})

router.post(
  '/cidades',
  cidadesController.createValidation,
  cidadesController.create
)



// res.send() envia uma string
// res.json() envia um objeto json
router.get('/api', (_, res) => {
  res.json({ api: 'up' })
})

// req.params é um objeto que contém os parâmetros da url
router.get('/api/echo/:what', (req, res) => {
  res.json({ echo: req.params.what })
})

// podemos pegar mais de um parâmetro da url
router.get('/api/echo/:what/:howmany', (req, res) => {
  const { what, howmany } = req.params
  const count = parseInt(howmany, 10) || 1
  const repeats = Array(count).fill(what).join(' ')
  res.json({ echo: repeats })
})

// req.body é um objeto que contém os dados enviados no corpo da requisição
router.post('/api/post', (req, res) => {
  return res.json(req.body)
})

export default router