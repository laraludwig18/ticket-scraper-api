import AppError from '../../errors/AppError';

import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import AuthenticateTicketService from '../AuthenticateTicketService';

import mockedTicketApi from '../../testUtils/mockedTicketApi';

const authenticatedUser = {
  email: 'johndoe@example.com',
  password: '123456',
};

jest.mock('../../utils/base64Decode', () =>
  jest.fn().mockReturnValue('123456'),
);

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('token_valid'),
}));

let fakeUsersRepository: FakeUsersRepository;
let authenticateTicketService: AuthenticateTicketService;

describe('AuthenticateTicketService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    authenticateTicketService = new AuthenticateTicketService(
      fakeUsersRepository,
    );
  });

  it('should be able to authenticate with non existing user', async () => {
    mockedTicketApi.onPost('/autenticar').replyOnce(200, {
      access_token: 'access_token_valid',
      id_user: 'id_valid',
    });

    const response = await authenticateTicketService.execute(authenticatedUser);

    expect(response).toStrictEqual('token_valid');
  });

  it('should be able to authenticate with existing user', async () => {
    await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      accessToken: 'access_token_valid',
      ticketId: 'id_valid',
    });

    mockedTicketApi.onPost('/autenticar').replyOnce(200, {
      access_token: 'access_token_valid',
      id_user: 'id_valid',
    });

    const response = await authenticateTicketService.execute(authenticatedUser);

    expect(response).toStrictEqual('token_valid');
  });

  it('should not be able to authenticate with wrong credentials', async () => {
    mockedTicketApi.onPost('/autenticar').replyOnce(400);

    await expect(
      authenticateTicketService.execute(authenticatedUser),
    ).rejects.toEqual(
      new AppError('Incorrect email/password combination.', 400),
    );
  });
});
