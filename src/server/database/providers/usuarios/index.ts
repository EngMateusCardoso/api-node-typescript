import * as getByEmail from './getByEmail';
import * as create from './create';

export const usuariosProviders = {
  ...getByEmail,
  ...create,
};
