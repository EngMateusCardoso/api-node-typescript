import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";

export const getAll = async (page: number, limit: number, filter: string): Promise<IPessoa[] | Error> => {
  try {
    // offset = (page - 1) * limit
    // significa que se a página for 1, o offset será 0 pegara os 10 primeiros registros
    // se a página for 2, o offset será 10 pegara os 10 registros seguintes
    // limit = 10 força 10 registros
    const result = await Knex(ETableNames.PESSOA)
      .select('*')
      .where('nomeCompleto', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit)

    return result
  } catch (error) {
    console.log(error)
    return new Error('Erro ao consultar os registros')
  }
}
