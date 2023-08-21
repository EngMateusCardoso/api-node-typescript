import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"

describe('Pessoas - getAll', () => {
  let accessToken= ''

  beforeAll(async () => {
    const email = 'deletepessoas@gmail.com'
    await testServer.post('/cadastrar').send({email, senha: '123456', nome: 'Delete Guy'});
  
    const res = await testServer.post('/entrar').send({email, senha: '123456'});

    accessToken = res.body.accessToken;
  })

  let cidadeId: number | undefined = undefined

  beforeAll(async () => {
    const resCreate = await testServer.post('/cidades').set({ Authorization: `Bearer ${accessToken}`}).send({ nome: 'CidadeTeste' })

    cidadeId = resCreate.body.id
  })

  it('Teste de getAll', async () => {
    const resCreate = await testServer.post('/pessoas').set({ Authorization: `Bearer ${accessToken}`}).send({
      cidadeId,
      nomeCompleto: 'Jhoe Tribiani',
      email: 'jhoeGetAll@tribi',
    });
    expect(resCreate.statusCode).toEqual(StatusCodes.CREATED);
    const resGet = await testServer.get('/pessoas').set({ Authorization: `Bearer ${accessToken}`}).send();
    expect(Number(resGet.header['x-total-count'])).toBeGreaterThan(0);
    expect(resGet.statusCode).toEqual(StatusCodes.OK);
    expect(resGet.body.length).toBeGreaterThan(0);
  })
})
