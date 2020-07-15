import IUsersRepository from '../../../repositories/IUsersRepository';
import User from '../schemas/User';
import IUserDTO from '../../../dtos/IUserDTO';
import IFindUserDTO from '../../../dtos/IFindUserDTO';

class UsersRepository implements IUsersRepository {
  public async findById(id: string): Promise<IFindUserDTO | null> {
    const user = await User.findById(id);
    return user;
  }

  public async findByEmail(email: string): Promise<IFindUserDTO | null> {
    const user = await User.findOne({ email });
    return user;
  }

  public async create(userData: IUserDTO): Promise<IFindUserDTO> {
    const user = await User.create(userData);
    return user;
  }
}

export default UsersRepository;
