import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ObjectSchema, ValidationError } from "yup";

// Opções de validação
type Tproperty = 'body' | 'header' | 'params' | 'query'

// Tipo do objeto que contém os schemas de validação
type TAllSchemas = Record<Tproperty, ObjectSchema<any>>

// RequestHamdler é um tipo do express, que não precisa especificar os tipos dos parâmetros req, res e next
// Esse tipo especifica que o parâmetro schemas e o retorno de RequestHandler
// Partial é do typescript, que torna todos os campos opcionais
type TValidation = (schemas: Partial<TAllSchemas>) => RequestHandler;

// Método de validação da controllers quaisquer
export const validation: TValidation = (schemas) => async (req, res, next) => {
  // Tipagem do objeto que vai conter os erros
  const errorsResult: Record<string, Record<string, string>> = {}
  // Percorre o objeto schemas e valida cada schema
  // Constrói um objeto de erros com os erros de cada schema
  Object.entries(schemas).forEach(([field, schema]) => {
    try {
      // validateSync é um método do yup que valida o campo
      // Ele espera a validação e não retorna uma promise como o validate
      schema.validateSync(req[field as Tproperty], { abortEarly: false })
    } catch (err) {
      // yupError é um objeto que pega o erro mapeado no try
      const yupError = err as ValidationError
      // Record é para tipar um objeto
      const errors: Record<string, string> = {}
      // yupError.inner é um array de erros
      yupError.inner.forEach((error, index) => {
        // Esse Inner tem 2 propriedades: path e message
        // path é o nome do campo que deu erro
        // message é a mensagem de erro
        if (!error.path) return;
        errors[error.path] = error.message 
      })
      // errorsResult é um objeto que contém os erros de cada campo
      // Coloca no objeto errorsResult com os erros de cada campo
      errorsResult[field] = errors;
    }
  })
  // Se não houver erros, chama o próximo middleware
  if (Object.entries(errorsResult).length === 0) {
    return next() 
  } else {
    // Se houver erros, retorna um json com os erros
    // e o status code 400 (BAD_REQUEST)
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult })
  }
}