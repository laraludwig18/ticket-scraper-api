import 'dotenv/config';
import '../mongo';

import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import routes from './routes';
import AppError from '../../errors/AppError';

// @ts-ignore
import swaggerDocument from '../../../docs/swagger.json';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT || 3333, () => {
  console.log('Server started on port 3333!');
});
