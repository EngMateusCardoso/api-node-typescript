import express from 'express'
import router from './routes'
import './shared/services/TranslationsYup.ts'

const server = express()

server.use(express.json())

server.use(router)

export default server
