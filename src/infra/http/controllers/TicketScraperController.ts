import { Request, Response } from 'express';

import UsersRepository from '../../mongo/repositories/UsersRepository';

import AuthenticateTicketService from '../../../services/AuthenticateTicketService';
import ListCardStatementsTicketService from '../../../services/ListCardStatementsTicketService';
import ShowUserDataTicketService from '../../../services/ShowUserDataTicketService';

const usersRepository = new UsersRepository();

export default class TicketScraperController {
  public async authenticate(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateTicketService = new AuthenticateTicketService(
      usersRepository,
    );

    const token = await authenticateTicketService.execute({
      email,
      password,
    });

    return res.json({ token });
  }

  public async getUserData(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user;

    const showUserDataTicketService = new ShowUserDataTicketService(
      usersRepository,
    );
    const user = await showUserDataTicketService.execute(userId);

    return res.json({ user });
  }

  public async listCardStatements(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { id: userId } = req.user;

    const listCardStatementsTicketService = new ListCardStatementsTicketService(
      usersRepository,
    );
    const cardStatements = await listCardStatementsTicketService.execute(
      userId,
    );

    return res.json(cardStatements);
  }
}
