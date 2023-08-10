import server from './server/server'

// Ouvindo o servidor na porta de .env se for nula ouve a porta 3300
server.listen(process.env.PORT || 3300, () => {
  console.log(`Server listening on port ${process.env.PORT || 3300}`)
})
