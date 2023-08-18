import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middleware/Validations'
import { ICidade } from '../../database/models'
import { cidadesProvider } from '../../database/providers/cidades'

// Tipagem do body da requisição
// O Omit é para remover o id da interface de cidades
interface IBodyProps extends Omit<ICidade, 'id'> {}

// Método de validação da controller Cidades
// Os parâmetros são os schemas de validação com a sintaxe do yup
// validation é uma função que retorna uma função que retorna um RequestHandler,
// portanto, createValidation é uma função que retorna um RequestHandler
export const createValidation  = validation({
  body: yup.object().shape({
    nome: yup.string().required().min(3).max(150),
  }),
})

// Método create da controller Cidades
export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const result = await cidadesProvider.create(req.body)
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: {default: result.message} })
  }
  return res.status(StatusCodes.CREATED).json(result)
}
