import { Knex } from './server/database/knex'
import server from './server/server'

// Carrega as variáveis de ambiente
require('dotenv').config()

const startServer = () => {
  // Ouvindo o servidor na porta de .env se for nula ouve a porta 3300
  server.listen(process.env.PORT || 3300, () => {
    console.log(`Server listening on port ${process.env.PORT || 3300}`)
  })
}

if(process.env.IS_LOCALHOST !== 'true') {
  console.log('Running migrations...')
  // Executa as migrations e depois inicia o servidor
  Knex.migrate.latest().then(() => {
    // popular as seed
    Knex.seed.run().then(() => {
      startServer()
    }).catch(console.log)
  }).catch(console.log)
} else {
  // No localhost não é necessário executar as migrations toda vez que o servidor inicia
  startServer()
}
