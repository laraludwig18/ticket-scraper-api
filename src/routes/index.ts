import { Router } from 'express';

import ticketRouter from './ticket.routes';

const routes = Router();

routes.use('/ticket', ticketRouter);

export default routes;
