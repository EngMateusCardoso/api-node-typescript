import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUsuario } from "../../models";

export const getByEmail = async (email: string): Promise<IUsuario | Error> => {
  try {
    const result = await Knex(ETableNames.USUARIO).select('*').where('email', '=', email).first()
    if (result) return result
    return new Error('Resgistro não encontrado')
  } catch (error) {
    console.log(error)
    return new Error('Erro ao consultar o registro')
  }
}
