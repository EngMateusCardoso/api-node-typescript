import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middleware/Validations'

// Tipagem do params
// qual a cidade
interface IParamProps {
  id?: number;
}
// novo nome
interface IBodyProps {
  nome?: string;
}

// Método de validação da controller Cidades
// Os parâmetros são os schemas de validação com a sintaxe do yup
// validation é uma função que retorna uma função que retorna um RequestHandler,
// portanto, Validation é uma função que retorna um RequestHandler
export const updateByIdValidation  = validation({
  body: yup.object().shape({
    nome: yup.string().required().min(3),
  }),
  params: yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  }),
})

// Método updateById da controller Cidades
export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
  if(Number(req.params.id) === 99999){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
  .send({ errors: { default: 'Registro não encontrado' } })
  }
  return res.status(StatusCodes.NO_CONTENT).send()
}
