import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUsuario } from "../../models";

export const create = async (usuario: Omit<IUsuario, 'id'>): Promise<number | Error> => {
  try {
    // returning funciona no postgres mas não no sqlite
    const [result] = await Knex(ETableNames.USUARIO).insert(usuario).returning('id')
    // trata as diferentes saidas do sqlite e postgres
    if (typeof result === 'object') {
      return result.id
    } else if (typeof result === 'number') {
      return result
    }
    return new Error('Erro ao cadastrar usuario')
  } catch (error) {
    console.log(error)
    return new Error('Erro ao cadastrar usuario')
  }
}
