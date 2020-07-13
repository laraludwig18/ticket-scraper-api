import { Request, Response } from 'express';

import AuthenticateTicketService from '../services/AuthenticateTicketService';
import ListCardStatementsTicketService from '../services/ListCardStatementsTicketService';
import ShowUserDataTicketService from '../services/ShowUserDataTicketService';

export default class TicketScraperController {
  public async authenticate(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateTicketService = new AuthenticateTicketService();
    const userId = await authenticateTicketService.execute({
      email,
      password,
    });

    return res.json({ userId });
  }

  public async getUserData(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;

    const showUserDataTicketService = new ShowUserDataTicketService();
    const user = await showUserDataTicketService.execute(userId);

    return res.json({ user });
  }

  public async listCardStatements(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { userId } = req.params;

    const listCardStatementsTicketService = new ListCardStatementsTicketService();
    const cardStatements = await listCardStatementsTicketService.execute(
      userId,
    );

    return res.json(cardStatements);
  }
}
