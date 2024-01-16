import express, { Request, Response } from 'express';
import {
  NotAuthorizedError,
  isAuthenticated,
  validateRequest,
  NotFoundError,
} from '@webcafetickets/shared-auth-middleware';
import { body } from 'express-validator';
import { Ticket } from '../model/tickets';
const router = express.Router();

router.put(
  '/api/tickets/:id',
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
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    ticket.set({
      title,
      price,
    });
    await ticket.save();

    res.send(ticket);
  }
);

export { router as updateTicket };
