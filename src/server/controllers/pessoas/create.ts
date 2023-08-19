import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middleware/Validations'
import { IPessoa } from '../../database/models'
import { pessoasProvider } from '../../database/providers/pessoas'

// Tipagem do body da requisição
// O Omit é para remover o id da interface de cidades
interface IBodyProps extends Omit<IPessoa, 'id'> {}

// Método de validação da controller Cidades
// Os parâmetros são os schemas de validação com a sintaxe do yup
// validation é uma função que retorna uma função que retorna um RequestHandler,
// portanto, createValidation é uma função que retorna um RequestHandler
export const createValidation  = validation({
  body: yup.object().shape({
    email: yup.string().required().email(),
    nomeCompleto: yup.string().required().min(3),
    cidadeId: yup.number().required().integer().positive(),
  }),
})

// Método create da controller Cidades
export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const result = await pessoasProvider.create(req.body)

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: {default: result.message} })
  }

  return res.status(StatusCodes.CREATED).json({"id": result})
}
