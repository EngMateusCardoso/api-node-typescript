import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"

describe('Cidades - updateById', () => {
  it('Atualiza registro existente', async () => { 
    const resCreate = await testServer.post('/cidades')
      .send({ nome: 'São Paulo'});
    expect(resCreate.statusCode).toEqual(StatusCodes.CREATED);
    const res = await testServer.put(`/cidades/${resCreate.body.id}`)
      .send({ nome: 'Rio de Janeiro'});
    expect(res.statusCode).toEqual(StatusCodes.NO_CONTENT);
  })
  it('Atualiza registro inexistente', async () => {
    const res = await testServer.put('/cidades/99999')
      .send({ nome: 'Rio de Janeiro'});
    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  })
})
