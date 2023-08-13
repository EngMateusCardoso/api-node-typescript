import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"

describe('Cidades - create', () => {
  it( 'Cria registro', async () => {
    const res1 = await testServer.post('/cidades').send({nome: 'São Paulo'});
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('object');
  })
  it( 'Nome com poucos caracteres', async () => {
    const res1 = await testServer.post('/cidades').send({nome: 'SP'});
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(typeof res1.body).toEqual('object');
    expect(res1.body).toHaveProperty('errors.body.nome');
  })
  it( 'Não envia nome', async () => {
    const res1 = await testServer.post('/cidades').send({nomes: 'São Paulo'});
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(typeof res1.body).toEqual('object');
    expect(res1.body).toHaveProperty('errors.body.nome');
  })
  it( 'Sem corpo', async () => {
    const res1 = await testServer.post('/cidades').send();
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(typeof res1.body).toEqual('object');
    expect(res1.body).toHaveProperty('errors.body.nome');
  })
})