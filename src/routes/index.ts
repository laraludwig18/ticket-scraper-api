import { Router } from 'express';

import TicketScraperController from '../controllers/TicketScraperController';

const ticketScraperController = new TicketScraperController();

const router = Router();

router.post('/ticket/auth', ticketScraperController.authenticate);
router.get('/ticket/user/:userId', ticketScraperController.getUserData);
router.get(
  '/ticket/statement/:userId',
  ticketScraperController.listCardStatements,
);

export default router;
