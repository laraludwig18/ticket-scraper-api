import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';
import ticketApi from '../apis/ticket';
import AppError from '../errors/AppError';
import base64Decode from '../utils/base64Decode';
import IUsersRepository from '../repositories/IUsersRepository';

interface IUserRequest {
  email: string;
  password: string;
}

class AuthenticateTicketService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ email, password }: IUserRequest): Promise<string> {
    try {
      const decodedPassword = base64Decode(password);

      const {
        data: { id_user: ticketId, access_token: accessToken },
      } = await ticketApi.post('/autenticar', {
        email,
        password: decodedPassword,
      });

      let user = await this.usersRepository.findByEmail(email);

      if (!user) {
        user = await this.usersRepository.create({
          email,
          ticketId,
          accessToken,
        });
      }

      const { secret, expiresIn } = authConfig;

      const token = sign({}, secret, {
        subject: String(user._id),
        expiresIn,
      });

      return token;
    } catch (err) {
      if (err.response?.status === 400) {
        throw new AppError('Incorrect email/password combination.');
      }

      throw err;
    }
  }
}

export default AuthenticateTicketService;
