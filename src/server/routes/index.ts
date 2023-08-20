import { Router} from 'express'
import { cidadesController, pessoasController, usuariosController } from './../controllers'
import { ensureAuthenticated } from '../shared/middleware'

// O router é um middleware que permite eu criar rotas para o meu servidor
// Depois de criar as rotas, eu preciso dizer ao meu servidor que ele vai usar essas rotas
const router = Router()

router.get('/', (_, res) => {
  res.send('working!')
})

router.post('/cidades', ensureAuthenticated, cidadesController.createValidation, cidadesController.create)
router.get('/cidades', ensureAuthenticated, cidadesController.getAllValidation, cidadesController.getAll)
router.get('/cidades/:id', ensureAuthenticated, cidadesController.getByIdValidation, cidadesController.getById)
router.put('/cidades/:id', ensureAuthenticated, cidadesController.updateByIdValidation, cidadesController.updateById)
router.delete('/cidades/:id', ensureAuthenticated, cidadesController.deleteByIdValidation, cidadesController.deleteById)

router.post('/pessoas', ensureAuthenticated, pessoasController.createValidation, pessoasController.create)
router.get('/pessoas', ensureAuthenticated, pessoasController.getAllValidation, pessoasController.getAll)
router.get('/pessoas/:id', ensureAuthenticated, pessoasController.getByIdValidation, pessoasController.getById)
router.put('/pessoas/:id', ensureAuthenticated, pessoasController.updateByIdValidation, pessoasController.updateById)
router.delete('/pessoas/:id', ensureAuthenticated, pessoasController.deleteByIdValidation, pessoasController.deleteById)

router.post('/entrar', usuariosController.signInValidation, usuariosController.signIn)
router.post('/cadastrar', usuariosController.signUpValidation, usuariosController.signUp)

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