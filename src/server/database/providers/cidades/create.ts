import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";

export const create = async (cidade: Omit<ICidade, 'id'>): Promise<number | Error> => {
  try {
    // returning funciona no postgres mas não no sqlite
    const [result] = await Knex(ETableNames.CIDADE).insert(cidade).returning('id')
    // trata as diferentes saidas do sqlite e postgres
    if (typeof result === 'object') {
      return result.id
    } else if (typeof result === 'number') {
      return result
    }
    return new Error('Erro ao cadastrar cidade')
  } catch (error) {
    console.log(error)
    return new Error('Erro ao cadastrar cidade')
  }
}