import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup"

describe('Cidades - deleteById', () => {
  it( 'Id apagada', async () => {
    const rescreate = await testServer.post('/cidades').send({ nome: 'Cidade 1'});
    expect(rescreate.statusCode).toEqual(StatusCodes.CREATED);
    const resdelete = await testServer.delete('/cidades/1').send();
    expect(resdelete.statusCode).toEqual(StatusCodes.NO_CONTENT);
  })
  it( 'Id não encontrado', async () => {
    const res1 = await testServer.delete('/cidades/99999').send();
    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  })
})

