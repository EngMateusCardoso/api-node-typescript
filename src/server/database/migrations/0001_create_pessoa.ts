import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.PESSOA, table => {
    table.bigIncrements('id').primary().index();
    table.string('nomeCompleto').notNullable().index();
    table.string('email').notNullable().unique();
    // Cascade é para quando mudar o id da cidade, mudar também o cidadeId da pessoa
    // Restric é para não deixar deletar uma cidade que tenha pessoas morando nela
    table.bigInteger('cidadeId').notNullable().index().references('id').inTable(ETableNames.CIDADE).onUpdate('CASCADE').onDelete('CASCADE').onDelete('RESTRICT');
    table.comment('Tabela de pessoas');
  })
  .then(() => console.log(`Table ${ETableNames.PESSOA} created`))
}

export async function down(knex: Knex) {
  // Voltar atrás (deletar a tabela)
  return knex.schema.dropTable(ETableNames.PESSOA)
  .then(() => console.log(`Table ${ETableNames.PESSOA} deleted`));
}
