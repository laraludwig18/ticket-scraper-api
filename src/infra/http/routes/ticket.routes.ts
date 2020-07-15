import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
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

ticketRouter.get(
  '/user',
  ensureAuthenticated,
  ticketScraperController.getUserData,
);

ticketRouter.get(
  '/statement',
  ensureAuthenticated,
  ticketScraperController.listCardStatements,
);

export default ticketRouter;
