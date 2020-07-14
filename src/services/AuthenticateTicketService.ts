import ticketApi from '../apis/ticket';
import User from '../schemas/User';
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

      const {
        data: { id_user: ticketId, access_token: accessToken },
      } = await ticketApi.post('/autenticar', {
        email,
        password: decodedPassword,
      });

      const user = await User.findOne({ email });

      if (user) {
        return user._id;
      }

      const { _id: userId } = await User.create({
        email,
        ticketId,
        accessToken,
      });

      return userId;
    } catch (err) {
      if (err.response?.status === 400) {
        throw new AppError('Incorrect email/password combination.');
      }

      throw err;
    }
  }
}

export default AuthenticateTicketService;
