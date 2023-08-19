import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";

export const updateById = async (id: number, pessoa: Omit<IPessoa, 'id'>): Promise<void | Error> => {
  try {
    // Verifica se a cidade existe
    const [{ count }] = await Knex(ETableNames.CIDADE).where('id', '=', pessoa.cidadeId).count<[{ count: number }]>('* as count')
    if (count === 0) {
      return new Error('Cidade não existe')
    }
    const result = await Knex(ETableNames.PESSOA).update(pessoa).where('id', '=', id)
    if (result === 0)
      return new Error('Resgistro não encontrado')
  } catch (error) {
    console.log(error)
    return new Error('Erro ao atualizar o registro')
  }
}