import { Knex } from 'knex'
// Biblioteca do Node para trabalhar com caminhos de arquivos
import path from 'path'

// Knex.Config helps to define the type of the object and autocomplete
export const development: Knex.Config = {
  // BD local in development
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    // Arquivo onde vai ser armazenado o BD
    filename: path.resolve(__dirname, '..', '..', '..', '..', 'database.sqlite')
  },
  migrations: {
    directory: path.resolve(__dirname, '..', 'migrations')
  },
  seeds: {
    directory: path.resolve(__dirname, '..', 'seeds')
  },
  // Para sqlite funcionar com foreign key
  pool: {
    afterCreate: (connection: any, done: Function) => {
      connection.run('PRAGMA foreign_keys = ON');
      done();
    }
  }
}

export const test: Knex.Config = {
  // Pega a mesma configuração de development
  ...development,
  // exclui os dados do BD a cada teste
  connection: ':memory:',
}

export const production: Knex.Config = {
  ...development
}
