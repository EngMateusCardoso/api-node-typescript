import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"

describe('Pessoas - deleteById', () => {
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

  it( 'Id apagada', async () => {
    const rescreate = await testServer.post('/pessoas').set({ Authorization: `Bearer ${accessToken}`}).send({
      cidadeId,
      nomeCompleto: 'Jhoe Tribiani',
      email: 'jhoeDelete@tribi',
    });
    expect(rescreate.statusCode).toEqual(StatusCodes.CREATED);
    const resDelete = await testServer.delete(`/pessoas/${rescreate.body.id}`).set({ Authorization: `Bearer ${accessToken}`}).send();
    expect(resDelete.statusCode).toEqual(StatusCodes.NO_CONTENT);
  })
  it( 'Id não encontrado', async () => {
    const res1 = await testServer.delete('/pessoas/99999').set({ Authorization: `Bearer ${accessToken}`}).send();
    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  })
})

