import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middleware/Validations'
import { IPessoa } from '../../database/models';
import { pessoasProvider } from '../../database/providers/pessoas';

// Tipagem do params
// qual a cidade
interface IParamProps {
  id?: number;
}
// novo nome
interface IBodyProps extends Omit<IPessoa, 'id'> {}

// Método de validação da controller Cidades
// Os parâmetros são os schemas de validação com a sintaxe do yup
// validation é uma função que retorna uma função que retorna um RequestHandler,
// portanto, Validation é uma função que retorna um RequestHandler
export const updateByIdValidation  = validation({
  body: yup.object().shape({
    email: yup.string().required().email(),
    nomeCompleto: yup.string().required().min(3),
    cidadeId: yup.number().required().integer().positive(),
  }),
  params: yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  }),
})

// Método updateById da controller Cidades
export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
  if (req.params.id === undefined)
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: { default: 'Id não encontrado' } })

  const result = await pessoasProvider.updateById(req.params.id, req.body)

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: {default: result.message} })
  }

  // Envia a cidade retornada se deu tudo certo
  return res.status(StatusCodes.NO_CONTENT).send(result)
}
