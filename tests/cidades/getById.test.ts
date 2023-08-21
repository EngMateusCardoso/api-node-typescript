import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"

describe('Cidades - getById', () => {
  let accessToken= ''

  beforeAll(async () => {
    const email = 'getbyidcidades@gmail.com'
    await testServer.post('/cadastrar').send({email, senha: '123456', nome: 'Delete Guy'});
  
    const res = await testServer.post('/entrar').send({email, senha: '123456'});

    accessToken = res.body.accessToken;
  })

  it('Busca registro existente', async () => { 
    const resCreate = await testServer.post('/cidades').set({ Authorization: `Bearer ${accessToken}`})
    .send({ nome: 'São Paulo'});
    expect(resCreate.statusCode).toBe(StatusCodes.CREATED);
    const res = await testServer.get(`/cidades/${resCreate.body.id}`).set({ Authorization: `Bearer ${accessToken}`}).send();
    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body).toHaveProperty('nome');
  })
  it('Busca registro inexistente', async () => {
    const res = await testServer.get('/cidades/99999').set({ Authorization: `Bearer ${accessToken}`}).send();
    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  })
})
