import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

/**
 *
 * @param req  session.jwt to req.currentUser
 * @param next check if user is authenticated
 */

export interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

const currentUser = (req: Request, _res: Response, next: NextFunction) => {
  // Check is cookie is valid & present
  if (!req.session?.jwt) {
    // Pass it to auth middleware
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  return next();
};

export { currentUser };
