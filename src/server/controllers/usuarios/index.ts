import * as signIn from './signIn'
import * as signUp from './signUp'

// Aqui ficam todos os métodos da Controller Cidades

export const usuariosController = {
  ...signIn,
  ...signUp,
}
