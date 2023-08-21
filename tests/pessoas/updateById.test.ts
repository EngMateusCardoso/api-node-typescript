import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"

describe('Pessoas - updateById', () => {
  let accessToken= ''

  beforeAll(async () => {
    const email = 'updatepessoas@gmail.com'
    await testServer.post('/cadastrar').send({email, senha: '123456', nome: 'Delete Guy'});
  
    const res = await testServer.post('/entrar').send({email, senha: '123456'});

    accessToken = res.body.accessToken;
  })

  let cidadeId: number | undefined = undefined

  beforeAll(async () => {
    const resCreate = await testServer.post('/cidades').set({ Authorization: `Bearer ${accessToken}`}).send({ nome: 'CidadeTeste' })

    cidadeId = resCreate.body.id
  })

  it('Atualiza registro existente', async () => { 
    const resCreate = await testServer.post('/pessoas').set({ Authorization: `Bearer ${accessToken}`})
      .send({
        cidadeId,
        nomeCompleto: 'Jhoe Tribiani',
        email: 'jhoeupdate@tribi',
      });
    expect(resCreate.statusCode).toEqual(StatusCodes.CREATED);
    const res = await testServer.put(`/pessoas/${resCreate.body.id}`).set({ Authorization: `Bearer ${accessToken}`})
      .send({
        cidadeId,
        nomeCompleto: 'Jhoe Tribiani',
        email: 'jhoeupdated@tribi',
      });
    expect(res.statusCode).toEqual(StatusCodes.NO_CONTENT);
  })
  it('Atualiza registro inexistente', async () => {
    const res = await testServer.put('/pessoas/99999').set({ Authorization: `Bearer ${accessToken}`})
      .send({
        cidadeId,
        nomeCompleto: 'Jhoe Tribiani',
        email: 'jhoeUpdate2@tribi',
      });
      console.log('AQUI', res.body);
    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  })
})
