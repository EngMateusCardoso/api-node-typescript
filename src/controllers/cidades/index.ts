import * as create from './create'
import * as getAll from './getAll'

// Aqui ficam todos os métodos da Controller Cidades

export const cidadesController = {
  ...create,
  ...getAll,
}
