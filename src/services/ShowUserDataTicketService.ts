import ticketApi from '../apis/ticket';
import AppError from '../errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IUserResponse {
  email: string;
  name: string;
  phoneNumber: string;
}

class ShowUserDataTicketService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute(userId: string): Promise<IUserResponse> {
    try {
      const user = await this.usersRepository.findById(userId);

      if (!user) {
        throw new AppError('User not found.');
      }

      const {
        data: {
          value: { email, name, cellPhone: phoneNumber },
        },
      } = await ticketApi.get(`/${user.ticketId}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      return { email, name, phoneNumber };
    } catch (err) {
      if (err.response?.status === 401) {
        throw new AppError('Failed to authenticate on ticket service.', 401);
      }

      throw err;
    }
  }
}

export default ShowUserDataTicketService;
