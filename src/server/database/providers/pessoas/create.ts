import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";

export const create = async (pessoa: Omit<IPessoa, 'id'>): Promise<number | Error> => {
  try {
    // Verifica se a cidade existe
    const [{ count }] = await Knex(ETableNames.CIDADE).where('id', '=', pessoa.cidadeId).count<[{ count: number }]>('* as count')
    if (count === 0) {
      return new Error('Cidade não existe')
    }
    // returning funciona no postgres mas não no sqlite
    const [result] = await Knex(ETableNames.PESSOA).insert(pessoa).returning('id')
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