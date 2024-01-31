import express, { Request, Response } from 'express';
import {
  isAuthenticated,
  validateRequest,
} from '@webcafetickets/shared-auth-middleware';
import { body } from 'express-validator';
import { Ticket } from '../model/tickets';
import { TicketCreatedPublisher } from '../events/publishers/ticket-created-publisher';
import { natsClient } from '../nats-client';
// import { Ticket } from '@/model/tickets';
const router = express.Router();

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
    await new TicketCreatedPublisher(natsClient.client).publish({
      title: ticket.title,
      price: ticket.price,
      id: ticket.id,
      userId: ticket.userId,
    });

    res.status(201).send(ticket);
  }
);

export { router as createTicket };
