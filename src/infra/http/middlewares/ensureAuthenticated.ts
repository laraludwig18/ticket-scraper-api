import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../../../errors/AppError';
import authConfig from '../../../config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    throw new AppError('JWT token is missing.', 401);
  }

  const [, token] = bearerToken.split(' ');

  try {
    const decoded = verify(token, authConfig.secret);

    const { sub } = decoded as ITokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token.', 401);
  }
}
