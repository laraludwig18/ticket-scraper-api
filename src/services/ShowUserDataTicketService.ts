import ticketApi from '../apis/ticket';

interface IUser {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
}

class ShowUserDataTicketService {
  public async execute(userId: string): Promise<IUser> {
    const {
      data: {
        value: { id, email, name, cellPhone: phoneNumber },
      },
    } = await ticketApi.get(`/${userId}`);

    return { id, email, name, phoneNumber };
  }
}

export default ShowUserDataTicketService;
