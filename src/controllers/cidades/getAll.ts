import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middleware/Validations'

// Tipagem do querry
// Parâmetros para não pegar tudo do banco
interface IQuerryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

// Método de validação da controller Cidades
// Os parâmetros são os schemas de validação com a sintaxe do yup
// validation é uma função que retorna uma função que retorna um RequestHandler,
// portanto, Validation é uma função que retorna um RequestHandler
export const getAllValidation  = validation({
  query: yup.object().shape({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    filter: yup.string().optional(),
  }),
})

// Método getAll da controller Cidades
export const getAll = async (req: Request<{}, {}, {}, IQuerryProps>, res: Response) => {
  res.setHeader('access-control-expose-headers', 'x-total-count')
  res.setHeader('x-total-count', 1)
  return res.status(StatusCodes.OK).json([{id: 1, nome: 'Cidade 1'}])
}
