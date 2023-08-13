import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"

describe('Cidades - getById', () => {
  it('Busca registro existente', async () => { 
    const resCreate = await testServer.post('/cidades')
    .send({ nome: 'São Paulo'});
    expect(resCreate.statusCode).toBe(StatusCodes.CREATED);
    const res = await testServer.get(`/cidades/${resCreate.body.id}`).send();
    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body).toHaveProperty('nome');
  })
  it('Busca registro inexistente', async () => {
    const res = await testServer.get('/cidades/99999').send();
    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  })
})
