import ticketApi from '../apis/ticket';
import User from '../schemas/User';
import AppError from '../errors/AppError';

interface IUser {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
}

class ShowUserDataTicketService {
  public async execute(userId: string): Promise<IUser> {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new AppError('User not found.');
      }

      const {
        data: {
          value: { id, email, name, cellPhone: phoneNumber },
        },
      } = await ticketApi.get(`/${user.ticketId}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      return { id, email, name, phoneNumber };
    } catch (err) {
      if (err.response?.status === 401) {
        throw new AppError('Failed to authenticate on ticket service.', 401);
      }

      throw err;
    }
  }
}

export default ShowUserDataTicketService;
