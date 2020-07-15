import AppError from '../../errors/AppError';

import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';

import mockedTicketApi from '../../testUtils/mockedTicketApi';
import ListCardStatementsTicketService from '../ListCardStatementsTicketService';

let fakeUsersRepository: FakeUsersRepository;
let listCardStatementsTicketService: ListCardStatementsTicketService;

describe('ListCardStatementsTicketService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listCardStatementsTicketService = new ListCardStatementsTicketService(
      fakeUsersRepository,
    );
  });

  it('should be able to list card statements', async () => {
    const userCreated = await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      accessToken: 'access_token_valid',
      ticketId: 'id_valid',
    });

    mockedTicketApi.onGet('/id_valid/cartoes').replyOnce(200, {
      value: [
        {
          balance: {
            bin: 'TAE',
            valueParsed: 277.87,
          },
          release: [
            {
              date: '01/07/2020 00:00:00',
              value: '275',
              dateParsed: '2020-07-01T00:00:00',
              valueParsed: 275.0,
              description: 'DISPONIB. DE CREDITO',
            },
          ],
        },
      ],
    });

    const response = await listCardStatementsTicketService.execute(
      userCreated._id,
    );

    expect(response).toStrictEqual([
      {
        cardType: 'TAE',
        balance: 277.87,
        statements: [
          {
            date: '01/07/2020 00:00:00',
            value: '275',
            dateParsed: '2020-07-01T00:00:00',
            valueParsed: 275.0,
            description: 'DISPONIB. DE CREDITO',
          },
        ],
      },
    ]);
  });

  it('should not be able to list card statements with non existing user', async () => {
    await expect(
      listCardStatementsTicketService.execute('non_existing_user_id'),
    ).rejects.toEqual(new AppError('User not found.', 400));
  });

  it('should not be able to list card statements with ticket token expired', async () => {
    const userCreated = await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      accessToken: 'access_token_valid',
      ticketId: 'id_valid',
    });

    mockedTicketApi.onGet('/id_valid/cartoes').replyOnce(401);

    await expect(
      listCardStatementsTicketService.execute(userCreated._id),
    ).rejects.toEqual(
      new AppError('Failed to authenticate on ticket service.', 401),
    );
  });
});
