import { NotFoundError } from '@webcafetickets/shared-auth-middleware';
import { Ticket } from '../model/tickets';
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    throw new NotFoundError();
  }
  res.status(200).send(ticket);
});

export { router as showTickets };
