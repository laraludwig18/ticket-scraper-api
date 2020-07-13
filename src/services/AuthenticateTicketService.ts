import ticketAuthApi from '../apis/ticket/auth';

import AppError from '../errors/AppError';
import base64Decode from '../utils/base64Decode';

interface IUser {
  email: string;
  password: string;
}

class AuthenticateTicketService {
  public async execute({ email, password }: IUser): Promise<string> {
    try {
      const decodedPassword = base64Decode(password);

      const { data } = await ticketAuthApi.post('/autenticar', {
        email,
        password: decodedPassword,
      });

      if (data?.id_user) {
        return data.id_user;
      }

      throw new AppError('Failed to retrieve user id.', 500);
    } catch (err) {
      if (err.response?.status === 400) {
        throw new AppError('Incorrect email/password combination.');
      }

      throw err;
    }
  }
}

export default AuthenticateTicketService;
