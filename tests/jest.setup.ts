import supertest from "supertest";
import server from "../src/server/server";

// Setup the test server
// Retorna uma instância do servidor
// Torna possivel fazer requisições para o servidor
export const testServer = supertest(server);
