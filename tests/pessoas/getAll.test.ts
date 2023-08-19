import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"

describe('Pessoas - getAll', () => {
  let cidadeId: number | undefined = undefined

  beforeAll(async () => {
    const resCreate = await testServer.post('/cidades').send({ nome: 'CidadeTeste' })

    cidadeId = resCreate.body.id
  })

  it('Teste de getAll', async () => {
    const resCreate = await testServer.post('/pessoas').send({
      cidadeId,
      nomeCompleto: 'Jhoe Tribiani',
      email: 'jhoeGetAll@tribi',
    });
    expect(resCreate.statusCode).toEqual(StatusCodes.CREATED);
    const resGet = await testServer.get('/pessoas').send();
    expect(Number(resGet.header['x-total-count'])).toBeGreaterThan(0);
    expect(resGet.statusCode).toEqual(StatusCodes.OK);
    expect(resGet.body.length).toBeGreaterThan(0);
  })
})
