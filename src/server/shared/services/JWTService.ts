import * as jwt from 'jsonwebtoken'

// User id  informação que será passada no token
// Pois o token é para um usuário específico
interface IJwtData {
  uid: number
}

const sign = (data: IJwtData) => {
  // this is undefined because it is not in the .env file
  if(!process.env.JWT_SECRET) {
    return 'JWT_SECRET_NOT_FOUND'
  }
  // Esse segundo parâmetro é uma chave secreta de autenticação que pertence ao servidor
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24h'})
}

const verify = (token: string): IJwtData | 'JWT_SECRET_NOT_FOUND' | 'INVALID_TOKEN' => {
  if(!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND'

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // string ginifica erro
    if (typeof decoded === 'string') return 'INVALID_TOKEN'
    return decoded as IJwtData
  } catch (error) {
    return 'INVALID_TOKEN'
  }
}

export const JWTService = {
  sign,
  verify,
}
