import ticketApi from '../apis/ticket';
import User from '../schemas/User';
import AppError from '../errors/AppError';

interface ICardStatement {
  cardType: string;
  balance: number;
  statements: [];
}

interface IValueTicketResponse {
  balance: {
    bin: string;
    valueParsed: number;
  };
  release: [];
}

interface ICardTicketResponse {
  value: IValueTicketResponse[];
}

class ListCardStatementsTicketService {
  public async execute(userId: string): Promise<ICardStatement[]> {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new AppError('User not found.');
      }

      const {
        data: { value },
      } = await ticketApi.get<ICardTicketResponse>(
        `/${user.ticketId}/cartoes`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        },
      );

      const cardStatements = value.map(({ balance, release }) => ({
        cardType: balance.bin,
        balance: balance.valueParsed,
        statements: release,
      }));

      return cardStatements;
    } catch (err) {
      if (err.response?.status === 401) {
        throw new AppError('Failed to authenticate on ticket service.', 401);
      }

      throw err;
    }
  }
}

export default ListCardStatementsTicketService;
