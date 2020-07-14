import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import TicketScraperController from '../controllers/TicketScraperController';

const ticketScraperController = new TicketScraperController();

const ticketRouter = Router();

ticketRouter.post(
  '/auth',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  ticketScraperController.authenticate,
);

ticketRouter.get('/user/:userId', ticketScraperController.getUserData);

ticketRouter.get(
  '/statement/:userId',
  ticketScraperController.listCardStatements,
);

export default ticketRouter;
