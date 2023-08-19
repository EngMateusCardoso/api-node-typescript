import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.PESSOA).where('id', '=', id).del()
    // Se o result for 0, significa que não foi apagado nenhum registro
    // Erro pode ser por causa do id não encontrado ou por causa de um erro no banco relacionado a FK
    if (result === 0) return new Error('Erro ao apagar o registro')
  } catch (error) {
    console.log(error)
    return new Error('Erro ao apagar o registro')
  }
}