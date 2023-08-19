import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.USUARIO, table => {
    table.bigIncrements('id').primary().index();
    table.string('nome').notNullable().checkLength('>', 3);
    table.string('email').notNullable().unique().checkLength('>', 5).index();
    table.string('senha').notNullable().checkLength('>', 6);
    table.comment('Tabela de usuários');
  })
  .then(() => console.log(`Table ${ETableNames.USUARIO} created`))
}

export async function down(knex: Knex) {
  // Voltar atrás (deletar a tabela)
  return knex.schema.dropTable(ETableNames.USUARIO)
  .then(() => console.log(`Table ${ETableNames.USUARIO} deleted`));
}
