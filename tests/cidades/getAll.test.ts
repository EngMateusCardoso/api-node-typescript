import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"

describe('Cidades - getAll', () => {
  let accessToken= ''

  beforeAll(async () => {
    const email = 'getallcidades@gmail.com'
    await testServer.post('/cadastrar').send({email, senha: '123456', nome: 'Delete Guy'});
  
    const res = await testServer.post('/entrar').send({email, senha: '123456'});

    accessToken = res.body.accessToken;
  })

  it('Teste de getAll', async () => {
    const resCreate = await testServer.post('/cidades').set({ Authorization: `Bearer ${accessToken}`}).send({ nome: 'Cidade 1'});
    expect(resCreate.statusCode).toEqual(StatusCodes.CREATED);
    const resGet = await testServer.get('/cidades').set({ Authorization: `Bearer ${accessToken}`}).send();
    expect(Number(resGet.header['x-total-count'])).toBeGreaterThan(0);
    expect(resGet.statusCode).toEqual(StatusCodes.OK);
    expect(resGet.body.length).toBeGreaterThan(0);
  })
})
