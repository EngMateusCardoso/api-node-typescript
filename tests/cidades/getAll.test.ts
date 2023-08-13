import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"

describe('Cidades - getAll', () => {
  it('Teste de getAll', async () => {
    const resCreate = await testServer.post('/cidades').send({ nome: 'Cidade 1'});
    expect(resCreate.statusCode).toEqual(StatusCodes.CREATED);
    const resGet = await testServer.get('/cidades').send();
    expect(Number(resGet.header['x-total-count'])).toBeGreaterThan(0);
    expect(resGet.statusCode).toEqual(StatusCodes.OK);
    expect(resGet.body.length).toBeGreaterThan(0);
  })
})
