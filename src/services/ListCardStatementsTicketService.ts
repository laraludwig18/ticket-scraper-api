import ticketApi from '../apis/ticket';

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
    const {
      data: { value },
    } = await ticketApi.get<ICardTicketResponse>(`/${userId}/cartoes`);

    const cardStatements = value.map(({ balance, release }) => ({
      cardType: balance.bin,
      balance: balance.valueParsed,
      statements: release,
    }));

    return cardStatements;
  }
}

export default ListCardStatementsTicketService;
