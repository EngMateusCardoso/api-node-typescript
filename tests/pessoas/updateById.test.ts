import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"

describe('Pessoas - updateById', () => {
  let cidadeId: number | undefined = undefined

  beforeAll(async () => {
    const resCreate = await testServer.post('/cidades').send({ nome: 'CidadeTeste' })

    cidadeId = resCreate.body.id
  })

  it('Atualiza registro existente', async () => { 
    const resCreate = await testServer.post('/pessoas')
      .send({
        cidadeId,
        nomeCompleto: 'Jhoe Tribiani',
        email: 'jhoeupdate@tribi',
      });
    expect(resCreate.statusCode).toEqual(StatusCodes.CREATED);
    const res = await testServer.put(`/pessoas/${resCreate.body.id}`)
      .send({
        cidadeId,
        nomeCompleto: 'Jhoe Tribiani',
        email: 'jhoeupdated@tribi',
      });
    expect(res.statusCode).toEqual(StatusCodes.NO_CONTENT);
  })
  it('Atualiza registro inexistente', async () => {
    const res = await testServer.put('/pessoas/99999')
      .send({
        cidadeId,
        nomeCompleto: 'Jhoe Tribiani',
        email: 'jhoeUpdate2@tribi',
      });
    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  })
})
