import express from 'express'
import router from './routes'
import '../shared/services/translationsYup'

// forma de dizer ao nosso servidor que ele vai receber requisições de qualquer lugar
const server = express()
// Espera receber requisições no formato json
server.use(express.json())
// Servidor vai usar as rotas que eu criei no arquivo em routes
server.use(router)

export default server
