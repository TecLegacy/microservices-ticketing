import express, { Request, Response } from 'express';
import {
  isAuthenticated,
  validateRequest,
} from '@webcafetickets/shared-auth-middleware';
import { body } from 'express-validator';
// import { Ticket } from '@/model/tickets';
import { Ticket } from '../model/tickets';
const router = express.Router();

export interface UserPayload {
  id: string;
  email: string;
}

router.get('/api/tickets', (req: Request, res: Response) => {
  res.sendStatus(200);
});

router.post(
  '/api/tickets',
  isAuthenticated,
  [
    body('title').notEmpty().withMessage('Enter a valid title'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price should be greater than Zero'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });

    await ticket.save();

    res.status(201).send(ticket);
  }
);

export { router as tickets };
