import supertest from "supertest";
import server from "../src/server/server";
import { Knex } from "../src/server/database/knex";

// Run migrations before all tests
// Executa as migrations antes de todos os testes
beforeAll(async () => {
  await Knex.migrate.latest();
  await Knex.seed.run();
});

// Run seeds before each test
// Executa os seeds antes de cada teste
afterAll(async () => {
  await Knex.destroy();
});

// Setup the test server
// Retorna uma instância do servidor
// Torna possivel fazer requisições para o servidor
export const testServer = supertest(server);
