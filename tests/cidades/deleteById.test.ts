import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"

describe('Cidades - deleteById', () => {
  let accessToken= ''

  beforeAll(async () => {
    const email = 'deletecidades@gmail.com'
    await testServer.post('/cadastrar').send({email, senha: '123456', nome: 'Delete Guy'});
  
    const res = await testServer.post('/entrar').send({email, senha: '123456'});

    accessToken = res.body.accessToken;
  })

  it( 'Id apagada', async () => {
    const rescreate = await testServer.post('/cidades').set({ Authorization: `Bearer ${accessToken}`}).send({ nome: 'Cidade 1'});
    expect(rescreate.statusCode).toEqual(StatusCodes.CREATED);

    const resdelete = await testServer.delete('/cidades/1').set({ Authorization: `Bearer ${accessToken}`}).send();
    expect(resdelete.statusCode).toEqual(StatusCodes.NO_CONTENT);
  })
  it( 'Id não encontrado', async () => {
    const res1 = await testServer.delete('/cidades/99999').set({ Authorization: `Bearer ${accessToken}`}).send();
    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  })
})

