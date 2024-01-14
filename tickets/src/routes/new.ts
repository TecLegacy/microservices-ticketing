import express, { Request, Response } from 'express';
import {
  currentUser,
  isAuthenticated,
} from '@webcafetickets/shared-auth-middleware';
const router = express.Router();
import jwt from 'jsonwebtoken';

export interface UserPayload {
  id: string;
  email: string;
}

router.post(
  '/api/tickets',
  currentUser,
  isAuthenticated,
  (req: Request, res: Response) => {
    // console.log(currentUser);
    // // res.sendStatus(402);
    // res.sendStatus(200);
    // // res.send({});
    // const reqss = req.session.jwt;
    // const reqss = req.session;

    // req.currentUser = jwt.verify(
    //   req.session!.jwt,
    //   'tickets'
    //   // process.env.JWT_KEY!
    // ) as UserPayload;
    res.status(200).send({
      currentUser: req.currentUser || null,
    });
  }
);

export { router as tickets };
