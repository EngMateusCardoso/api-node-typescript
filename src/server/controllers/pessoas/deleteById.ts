import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middleware/Validations'
import { pessoasProvider } from '../../database/providers/pessoas';

// Id apagada
interface IParamProps {
  id?: number;
}

// Método de validação da controller Cidades
// Os parâmetros são os schemas de validação com a sintaxe do yup
// validation é uma função que retorna uma função que retorna um RequestHandler,
// portanto, Validation é uma função que retorna um RequestHandler
export const deleteByIdValidation  = validation({
  params: yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  }),
})

// Método deleteById da controller Cidades
export const deleteById = async (req: Request<IParamProps>, res: Response) => {
  if (req.params.id === undefined)
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: { default: 'Id não encontrado' } })

  const result = await pessoasProvider.deleteById(req.params.id)

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: {default: result.message} })
  }

  // Envia vazio se deu tudo certo
  return res.status(StatusCodes.NO_CONTENT).send()
}
