import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middleware/Validations'
import { cidadesProvider } from '../../database/providers/cidades';

// Tipagem do querry
// Parâmetros para não pegar tudo do banco
interface IQuerryProps {
  id?: number;
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
    id: yup.number().integer().notRequired().default(0),
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    filter: yup.string().optional(),
  }),
})

// Método getAll da controller Cidades
export const getAll = async (req: Request<{}, {}, {}, IQuerryProps>, res: Response) => {
  const result = await cidadesProvider.getAll(req.query.page || 1, req.query.limit || 10, req.query.filter || '', Number(req.query.id || 0))
  const count = await cidadesProvider.count(req.query.filter)

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: {default: result.message} })
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: {default: count.message} })
  }

  // Expor o Header x-total-count
  res.setHeader('access-control-expose-headers', 'x-total-count')
  // Setar o valor do Header x-total-count
  res.setHeader('x-total-count', count)

  return res.status(StatusCodes.OK).json(result)
}
