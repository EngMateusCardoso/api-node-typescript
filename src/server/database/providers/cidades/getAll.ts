import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";

export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<ICidade[] | Error> => {
  try {
    // offset = (page - 1) * limit
    // significa que se a página for 1, o offset será 0 pegara os 10 primeiros registros
    // se a página for 2, o offset será 10 pegara os 10 registros seguintes
    // limit = 10 força 10 registros
    const result = await Knex(ETableNames.CIDADE)
      .select('*')
      .where('id', Number(id))
      .orWhere('nome', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit)
    
    // Se o Id que estou consultando não vem na página
    if (id > 0 && result.every(cidade => cidade.id !== id)){
      // Procura o registro pelo Id no banco de dados todo
      const resultById = await Knex(ETableNames.CIDADE)
        .select('*')
        .where('id', Number(id))
        .first()
      // Se encontrar o registro pelo Id, retorna o registro junto com os registros da página
      if (resultById)
        return [...result, resultById]
    }
    return result
  } catch (error) {
    console.log(error)
    return new Error('Erro ao consultar os registros')
  }
}