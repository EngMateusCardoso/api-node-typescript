import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middleware/Validations'

// Tipagem do body da requisição
interface ICidade {
  nome: string
}

// Método de validação da controller Cidades
// Os parâmetros são os schemas de validação com a sintaxe do yup
// validation é uma função que retorna uma função que retorna um RequestHandler,
// portanto, createValidation é uma função que retorna um RequestHandler
export const createValidation  = validation({
  body: yup.object().shape({
    nome: yup.string().required().min(3),
  }),
})

// Método create da controller Cidades
export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  console.log(req.body)
  return res.status(StatusCodes.CREATED).send({ id: 1})
}
