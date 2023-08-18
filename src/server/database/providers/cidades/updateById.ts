import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";

export const updateById = async (id: number, cidade: Omit<ICidade, 'id'>): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.CIDADE).update(cidade).where('id', '=', id)
    if (result === 0)
      return new Error('Resgistro não encontrado')
  } catch (error) {
    console.log(error)
    return new Error('Erro ao atualizar o registro')
  }
}