import { passwordCrypto } from "../../../shared/services";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IUsuario } from "../../models";

export const create = async (usuario: Omit<IUsuario, 'id'>): Promise<number | Error> => {
  try {
    const hashedPassword = await passwordCrypto.hashPassword(usuario.senha)
    // returning funciona no postgres mas não no sqlite
    // no insert {...usuario, senha: hashedPassword} é uma forma de copiar o objeto usuario e alterar a senha
    const [result] = await Knex(ETableNames.USUARIO).insert({...usuario, senha: hashedPassword}).returning('id')
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
