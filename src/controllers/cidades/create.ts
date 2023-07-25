import { Request, RequestHandler, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'

interface ICidade {
  nome: string
}

const bodyValidation: yup.Schema<ICidade> = yup.object().shape({
  nome: yup.string().required().min(3),
})

export const createBodyValidation: RequestHandler = async (req, res, next) => {
  try {
    await bodyValidation.validate(req.body, { abortEarly: false })
    next()
  } catch (err) {
    const yupErrorr = err as yup.ValidationError
    const errors: Record<string, string> = {}
    yupErrorr.inner.forEach((error, index) => {
      if (!error.path) return;
      errors[error.path] = error.message
    })
    return res.status(StatusCodes.BAD_REQUEST).json({ errors })
  }
}


export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  console.log(req.body)
  return res.send('Create!')
}
