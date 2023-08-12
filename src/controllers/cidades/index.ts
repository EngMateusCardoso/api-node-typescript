import * as create from './create'
import * as getAll from './getAll'
import * as getById from './getById'
import * as updateById from './updateById'
import * as deleteById from './deleteById'

// Aqui ficam todos os métodos da Controller Cidades

export const cidadesController = {
  ...create,
  ...getAll,
  ...getById,
  ...updateById,
  ...deleteById,
}
