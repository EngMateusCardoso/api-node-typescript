import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middleware/Validations'

// Tipagem do params
interface IParamProps {
  id?: number;
}

// Método de validação da controller Cidades
// Os parâmetros são os schemas de validação com a sintaxe do yup
// validation é uma função que retorna uma função que retorna um RequestHandler,
// portanto, Validation é uma função que retorna um RequestHandler
export const getByIdValidation  = validation({
  params: yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  }),
})

// Método getById da controller Cidades
export const getById = async (req: Request<IParamProps>, res: Response) => {
  console.log(req.params)
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado')
}
