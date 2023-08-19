import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"

describe('Pessoas - getById', () => {
  let cidadeId: number | undefined = undefined

  beforeAll(async () => {
    const resCreate = await testServer.post('/cidades').send({ nome: 'CidadeTeste' })

    cidadeId = resCreate.body.id
  })

  it('Busca registro existente', async () => { 
    const resCreate = await testServer.post('/pessoas')
    .send({
      cidadeId,
      nomeCompleto: 'Jhoe Tribiani',
      email: 'jhoeGetById@tribi',
    });
    expect(resCreate.statusCode).toBe(StatusCodes.CREATED);
    const res = await testServer.get(`/pessoas/${resCreate.body.id}`).send();
    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body).toHaveProperty('nomeCompleto');
  })
  it('Busca registro inexistente', async () => {
    const res = await testServer.get('/pessoas/99999').send();
    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  })
})
