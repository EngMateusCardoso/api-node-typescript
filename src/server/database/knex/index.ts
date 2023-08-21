import {knex} from "knex";
import {development, test, production} from "./Enviroment";

import pg from 'pg';

if (process.env.NODE_ENV === 'production') {
  // Essa função arruma os tipos do postgres
  // Para que o postgres consiga converter o tipo serial para inteiro
  pg.types.setTypeParser(20, 'text', parseInt);
}

const getEnviroment = () => {
  const enviroment = process.env.NODE_ENV || 'development';
  switch (enviroment) {
    case 'development':
      return development;
    case 'test':
      return test;
    case 'production':
      return production;
    default:
      return development;
  }
}

// Exporta o knex com as configurações de acordo com o ambiente
export const Knex = knex(getEnviroment());
