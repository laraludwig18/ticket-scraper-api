import { uuid } from 'uuidv4';

import IUserDTO from '../../dtos/IUserDTO';
import IFindUserDTO from '../../dtos/IFindUserDTO';
import IUsersRepository from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: IFindUserDTO[] = [];

  public async findById(id: string): Promise<IFindUserDTO | null> {
    return this.users.find(user => user._id === id) as IFindUserDTO;
  }

  public async findByEmail(email: string): Promise<IFindUserDTO | null> {
    return this.users.find(user => user.email === email) as IFindUserDTO;
  }

  public async create(userData: IUserDTO): Promise<IFindUserDTO> {
    const newUser = { ...userData, _id: uuid() };
    this.users.push(newUser);

    return newUser;
  }
}

export default FakeUsersRepository;
