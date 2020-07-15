import IUserDTO from '../dtos/IUserDTO';
import IFindUserDTO from '../dtos/IFindUserDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<IFindUserDTO | null>;
  findByEmail(email: string): Promise<IFindUserDTO | null>;
  create(data: IUserDTO): Promise<IFindUserDTO>;
}
