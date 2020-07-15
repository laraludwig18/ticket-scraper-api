import AppError from '../../errors/AppError';

import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';

import mockedTicketApi from '../../testUtils/mockedTicketApi';
import ShowUserDataTicketService from '../ShowUserDataTicketService';

let fakeUsersRepository: FakeUsersRepository;
let showUserDataTicketService: ShowUserDataTicketService;

describe('ShowUserDataTicketService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showUserDataTicketService = new ShowUserDataTicketService(
      fakeUsersRepository,
    );
  });

  it('should be able to return user data', async () => {
    const userCreated = await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      accessToken: 'access_token_valid',
      ticketId: 'id_valid',
    });

    mockedTicketApi.onGet('/id_valid').replyOnce(200, {
      value: {
        email: 'johndoe@example.com',
        name: 'John Doe',
        cellPhone: '51993764532',
      },
    });

    const response = await showUserDataTicketService.execute(userCreated._id);

    expect(response).toStrictEqual({
      email: 'johndoe@example.com',
      name: 'John Doe',
      phoneNumber: '51993764532',
    });
  });

  it('should not be able to return user data with non existing user', async () => {
    await expect(
      showUserDataTicketService.execute('non_existing_user_id'),
    ).rejects.toEqual(new AppError('User not found.', 400));
  });

  it('should not be able to return user data with ticket token expired', async () => {
    const userCreated = await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      accessToken: 'access_token_valid',
      ticketId: 'id_valid',
    });

    mockedTicketApi.onGet('/id_valid').replyOnce(401);

    await expect(
      showUserDataTicketService.execute(userCreated._id),
    ).rejects.toEqual(
      new AppError('Failed to authenticate on ticket service.', 401),
    );
  });
});
