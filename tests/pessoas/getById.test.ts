import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"

describe('Pessoas - getById', () => {
  let accessToken= ''

  beforeAll(async () => {
    const email = 'getbyidpessoas@gmail.com'
    await testServer.post('/cadastrar').send({email, senha: '123456', nome: 'Delete Guy'});
  
    const res = await testServer.post('/entrar').send({email, senha: '123456'});

    accessToken = res.body.accessToken;
  })

  let cidadeId: number | undefined = undefined

  beforeAll(async () => {
    const resCreate = await testServer.post('/cidades').set({ Authorization: `Bearer ${accessToken}`}).send({ nome: 'CidadeTeste' })

    cidadeId = resCreate.body.id
  })

  it('Busca registro existente', async () => { 
    const resCreate = await testServer.post('/pessoas').set({ Authorization: `Bearer ${accessToken}`})
    .send({
      cidadeId,
      nomeCompleto: 'Jhoe Tribiani',
      email: 'jhoeGetById@tribi',
    });
    expect(resCreate.statusCode).toBe(StatusCodes.CREATED);
    const res = await testServer.get(`/pessoas/${resCreate.body.id}`).set({ Authorization: `Bearer ${accessToken}`}).send();
    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body).toHaveProperty('nomeCompleto');
  })
  it('Busca registro inexistente', async () => {
    const res = await testServer.get('/pessoas/99999').set({ Authorization: `Bearer ${accessToken}`}).send();
    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  })
})
