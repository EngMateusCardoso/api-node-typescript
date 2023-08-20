import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middleware/Validations'
import { IUsuario } from '../../database/models'
import { usuariosProviders } from '../../database/providers/usuarios'

interface IBodyProps extends Omit<IUsuario, 'id' | 'nome'> {}

export const signInValidation  = validation({
  body: yup.object().shape({
    email: yup.string().required().email().min(5),
    senha: yup.string().required().min(6),
  }),
})

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const { email, senha } = req.body

  const result = await usuariosProviders.getByEmail(email)

  if (result instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ errors: {default: 'Email ou senha inválidos'} })
  }

  if (result.senha !== senha) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ errors: {default: 'Email ou senha inválidos'} })
  } else {
    return res.status(StatusCodes.OK).json({ accessToken: '123456789'})
  }
}
