import {knex} from "knex";
import {development, test, production} from "./Enviroment";

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
