import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"

describe('Cidades - updateById', () => {
  let accessToken= ''

  beforeAll(async () => {
    const email = 'updatecidades@gmail.com'
    await testServer.post('/cadastrar').send({email, senha: '123456', nome: 'Delete Guy'});
  
    const res = await testServer.post('/entrar').send({email, senha: '123456'});

    accessToken = res.body.accessToken;
  })

  it('Atualiza registro existente', async () => { 
    const resCreate = await testServer.post('/cidades').set({ Authorization: `Bearer ${accessToken}`})
      .send({ nome: 'São Paulo'});
    expect(resCreate.statusCode).toEqual(StatusCodes.CREATED);
    const res = await testServer.put(`/cidades/${resCreate.body.id}`).set({ Authorization: `Bearer ${accessToken}`})
      .send({ nome: 'Rio de Janeiro'});
    expect(res.statusCode).toEqual(StatusCodes.NO_CONTENT);
  })
  it('Atualiza registro inexistente', async () => {
    const res = await testServer.put('/cidades/99999').set({ Authorization: `Bearer ${accessToken}`})
      .send({ nome: 'Rio de Janeiro'});
    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  })
})
