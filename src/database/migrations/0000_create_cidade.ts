import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.CIDADE, table => {
    // index otimiza as buscas
    table.bigIncrements('id').primary().index();
    table.string('nome', 150).notNullable().index();
    table.comment('Nome da cidade');
  })
  .then(() => console.log(`Table ${ETableNames.CIDADE} created`))
}

export async function down(knex: Knex) {
  // Voltar atrás (deletar a tabela)
  return knex.schema.dropTable(ETableNames.CIDADE)
  .then(() => console.log(`Table ${ETableNames.CIDADE} deleted`));
}
